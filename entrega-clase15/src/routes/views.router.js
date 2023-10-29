import {Router} from "express";
import Products from "../dao/dbManagers/products.managers.js";
import Carts from "../dao/dbManagers/carts.managers.js"


const router = Router();
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
// router.get("/courses-view", async (req, res)=>{
//     try {
//         const courses = await coursesManager.getAll();
//         res.render("courses", {courses})
//     } catch (error) {
//         console.log(error.message);
//     }
// });

export default router;
