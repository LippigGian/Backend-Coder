import {Router} from "express";
import Products from "../dao/dbManagers/products.managers.js";
import Carts from "../dao/dbManagers/carts.managers.js"
import Message from "../dao/dbManagers/messages.managers.js";


const router = Router();
const messagesManager = new Message ();
const productsManager = new Products();
const cartsManager = new Carts();


//Tendremos 2 vistas, una para estudiantes y otra para cursos.

router.get("/products-view", async (req, res)=>{
    try {
        const products = await productsManager.getAll();
        res.render("products", {products})
    } catch (error) {
        console.log(error.message);
    }
});
router.get("/carts-view", async (req, res)=>{
    try {
        const carts = await cartsManager.getAll();
        res.render("carts", {carts})
    } catch (error) {
        console.log(error.message);
    }
});
router.get("/messages", async (req, res)=>{
    try {
        const messages = await messagesManager.getAll();
        res.render("messages", {messages})
    } catch (error) {
        console.log(error.message);
    }
});


export default router;
