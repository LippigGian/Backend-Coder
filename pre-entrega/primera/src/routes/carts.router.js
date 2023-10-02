import { Router } from "express";
import CartManager from "../managers/cart.manager.js";
import ProductManager from "../managers/products.manager.js";
//Importo la clase y luego creo la instancia.

const cartManager = new CartManager("./managers/files/carrito.json")
const productManager = new ProductManager("./managers/files/productos.json")

const router = Router();
const carts = [];
//La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
//Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
//products: Array que contendrá objetos que representen cada producto


router.post("/", async (req,res)=>{
    //Recibimos del body un array de productos.
    const cart = req.body;
    const carts = await cartManager.getCarts();
    cart.products=[];
    if(carts.length === 0){
        cart.id = 1;
        
      }else{
        cart.id = carts[carts.length -1].id +1
      }
      //insertamos el elemento o usuario
    carts.push(cart)
    console.log(carts)
    // console.log(user)
    //Nuevamente guardar en el archivo TODOS los carritos
//await cartManager.save(carts)


    console.log(cart)
    
    cartManager.saveCarts(carts)
    res.send("exitoso")
   /* voy a recibir algo asi:
    //Objeto para almacenar nuestro carrito
    // {
    //     id: 'HJABJHASD65761457',
    //     products: [
    //         {
    //             id: 1,
    //             quantity: 1
    //         },
    //         {
    //             id: 2,
    //             quantity: 1
    //         }
    //     ]
    // }
    */ 
});

router.get("/", async (req,res)=>{
    const cart = await cartManager.getCarts();
    // res.send(console.log("llego piola"))
    res.send(cart)

})

//La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.

router.get("/:cid", async (req,res)=>{
    const id = Number(req.params.cid)
    const cart = await cartManager.getCartById(id);
    console.log(id)
    // res.status(200).send(id)
    res.send(cart)
});


/*La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
*/
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
    // cartById.products.id =productId;
    // cartById.products.quantity = 1;
    //Primero hallar el index del carrito

    // carts[cartIndex].products.id=productId;
    // carts[cartIndex].products.quantity = 1;
    
    //Tengo que preguntar si products =[cartIndex].id existe solo le sumo un quantity;
    //si no existe le agrego un id y un quantity = 1;


    
// 
// if(indexProductCart !=-1)
// {
//     cartById.products[indexProductCart]= cartById.products[indexProductCart].quantity++
// }else{
// //pusheo el producto al carrito
// cartById.products.push({id: 1})
// }

// const indexProductCart = cartById.products.findIndex(product => product.id == productId);
console.log(cartById)
// const indexProductCart = cartById.products.findIndex(product => product.id == productId);

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

//     if(carts[cartIndex].products.id == productId){
//         console.log("entro al primer if anidado")
// carts[cartIndex].products.push({ id: productId, quantity: 1 })
//     }else{
//         console.log("Se agregara una unidad a quantity")
//     }



//     console.log(cartById)
    
cartManager.saveCarts(carts)
}

//Primero obtengo todos los carritos.
//MEjor primero obtengo el carrito por id
//En este punto voy a tener un objeto similar a este:
    //Objeto para almacenar nuestro carrito
    // {
    //     id: 'HJABJHASD65761457',
    //     products: [
    //         {
    //             id: 1,
    //             quantity: 1
    //         },
    //         {
    //             id: 2,
    //             quantity: 1
    //         }
    //     ]
    // }
    
//Luego busco entre ese array de carritos el que tenga el cid


//En caso de encontrarlo sigo con la logica
//Caso contrario devuelvo un error 400 que no se encuentra en carrito
//tomo el arreglo de productos de ese carrito y hago un push de un objeto. 
//Ejemplo del objeto:
// {
//     id: /pid
// }
//Luego guardar en el archivo
//Cada producto debera tener un atributo quantity.

//Validacion adicional en el caso de que el producto ya este en el carrito, solo habrá que modificar su atributo quantity. Todo esto antes de hacer el push.
//Primero busco en el arreglo de productos de ese carrito si el producto que quiero agregar ya existe.
//Si existe deberia hacer un product.quantity++;
//Si no existe deberia hacer un product.quantity = 1;




// const indexProductCart = cartById.products.findIndex(product => product.id == pid);
// if(indexProductCart !=-1)
// {
//     cartById.products[indexProductCart]= cartById.products[indexProductCart].quantity++
// }else{
// //pusheo el producto al carrito
// cartById.products.push({id: 1})
// }

//Nuevamente guardar en el archivo TODOS los carritos
// await cartManager.save(carts)
});


export default router;