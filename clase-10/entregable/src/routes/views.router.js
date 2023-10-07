import { Router } from "express";
import ProductManager from "../managers/products.manager.js"
import  __dirname  from "../utils.js";
import path from 'node:path';

// Los datos que deseas pasar al template
// const data = {
//     miArray: ['Elemento 1', 'Elemento 2', 'Elemento 3']
// };

const router = Router();
const productsFilePath = path.join(__dirname, "./managers/files/productos.json");
//Le tengo que pasar el path a ProductManager
// const productManager = new ProductManager("./managers/files/productos.json");
const productManager = new ProductManager(productsFilePath);

router.get("/", async (req, res)=>{
    try {
         // res.render("index");
    const array = await productManager.getProducts();
    res.render("home",{array})
    } catch (error) {
        console.log(error)
    }
});

export default router;