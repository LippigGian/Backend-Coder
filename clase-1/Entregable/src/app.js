import express from "express";
import { ProductManager } from "./ProductManager.js";

const app = express();

// app.use(express.urlencoded({extended: true}))

//instancia de la clase 
const manager = new ProductManager("./files/productos.json");

//obtencion de productos

app.get("/products", async (req,res) =>{
    const products = await manager.get();
    res.send(products) //Con express se sobreentiende que en esta respuesta estamos retornando un codigo 200
})












// const env  = async () => {

//     const products = await manager.get();
// }
// env();

// console.log(products)