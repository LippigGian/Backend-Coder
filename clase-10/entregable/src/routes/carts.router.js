import { Router } from "express";
import CartManager from "../managers/cart.manager.js";
import ProductManager from "../managers/products.manager.js";

const cartManager = new CartManager("./managers/files/carrito.json")

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
router.post("/:cid/product/:pid", async (req,res)=>{
//Obtengo el id del carrito que necesito por path params
const cartId = Number(req.params.cid);
//Obtengo el id del producto que necesito por path params
const productId = Number(req.params.pid);
    const newCart = await cartManager.modifyCart(cartId,productId);
    res.send(newCart)
})



export default router;