import { Router } from "express";
import CartManager from "../managers/cart.manager.js";
import ProductManager from "../managers/products.manager.js";
//Importo la clase y luego creo la instancia.

const cartManager = new CartManager("./managers/files/carrito.json")
const productManager = new ProductManager("./managers/files/productos.json")

const router = Router();
const carts = [];

router.post("/", async (req,res)=>{
    const cart = req.body;
    const newCart = await cartManager.createCart(cart);
    res.send(newCart)
})

router.get("/", async (req,res)=>{
    const cart = await cartManager.getCarts();
    res.send(cart)
})

//La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.

router.get("/:cid", async (req,res)=>{
    const id = Number(req.params.cid)
    const cart = await cartManager.getCartById(id);
    res.send(cart)
});


/*La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
*/
// router.post("/:cid/product/:pid", async (req,res)=>{
// //Obtengo el id del carrito que necesito por path params
// const cartId = Number(req.params.cid);
// //Obtengo el id del producto que necesito por path params
// const productId = Number(req.params.pid);
//     const newCart = await cartManager.modifyCart(cartId,productId);
// })


router.post("/:cid/product/:pid", async (req,res)=>{

//Obtengo todos los carritos
const carts = await cartManager.getCarts();
//Obtengo el id del carrito que necesito por path params
const cartId = Number(req.params.cid);
//Obtengo el id del producto que necesito por path params
const productId = Number(req.params.pid);
//Busco en CARTS el carrito al que voy a agregar un producto:
const cartById = await cartManager.getCartById(cartId)
console.log({cartById})
// const cartById = carts.find((cart) => cart.id == cartId);
const cartIndex = carts.findIndex(cart => cart.id ===cartId)
// console.log(productId)
if (cartIndex === -1) {
    
    res.status(404).send("Error, producto no encontrado")
    console.log("error, carrito no encontrado")
//   return { error: "Carrito no encontrado" };
}else{
    

console.log(cartById)

 const indexProductCart = carts[cartIndex].products.findIndex(product => product.id == productId);
if(indexProductCart !=-1)
{
//     carts[cartIndex].products[indexProductCart]=carts[cartIndex].products[indexProductCart].quantity++;
carts[cartIndex].products[indexProductCart].quantity++;
    console.log("entro en el if")
}else{
    carts[cartIndex].products.push({id:productId,quantity:1})
    console.log("Entro en el else")
}
console.log(indexProductCart)

cartManager.saveCarts(carts)
}

});


export default router;