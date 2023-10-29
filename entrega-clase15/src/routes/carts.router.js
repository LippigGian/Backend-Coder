import { Router } from "express";
import Carts from "../dao/dbManagers/carts.managers.js";
// import CartManager from "../managers/cart.manager.js";
// import ProductManager from "../dao/fileManagers/products.manager.js";

// // const cartManager = new CartManager("./managers/files/carrito.json")




const router = Router();

const cartsManager = new Carts();

//TRABAJANDO CON BD

router.get("/", async (req,res)=>{
    try {
       const carts = await cartsManager.getAll();
       res.send({status: "success", payload: carts}); 
    } catch (error) {
        res.status(500).send({status: "error", message: error.message});
    }
});


router.post("/", async (req,res)=>{
    try {
     const {title, description, price, products} = req.body;
     if(!title || !description || !price || !products){
         return res.status(400).send({status: "error", message: "incomplete values"})
     }
     const result = await cartsManager.save({
         title,
         description,
         price
     });
     //En el post estoy creando un nuevo recurso, por lo que debo devolver un 201;
     res.status(201).send({status: "success", payload: result});
    } catch (error) {
     res.status(500).send({status: "error", message: error.message});
    } 
 });




// const router = Router();
// const carts = [];

// router.post("/", async (req,res)=>{
//     const cart = req.body;
//     const newCart = await cartManager.createCart(cart);
//     res.send(newCart)
// })

// router.get("/", async (req,res)=>{
//     const cart = await cartManager.getCarts();
//     res.send(cart)
// })

// //La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.

// router.get("/:cid", async (req,res)=>{
//     const id = Number(req.params.cid)
//     const cart = await cartManager.getCartById(id);
//     res.send(cart)
// });


// /*La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
// product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
// */
// router.post("/:cid/product/:pid", async (req,res)=>{
// //Obtengo el id del carrito que necesito por path params
// const cartId = Number(req.params.cid);
// //Obtengo el id del producto que necesito por path params
// const productId = Number(req.params.pid);
//     const newCart = await cartManager.modifyCart(cartId,productId);
//     res.send(newCart)
// })



export default router;