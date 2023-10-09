import { Router } from "express";
import ProductManager from "../managers/products.manager.js";
import __dirname from "../utils.js";
import path from "node:path";

const router = Router();
const productsFilePath = path.join(
  __dirname,
  "./managers/files/productos.json"
);
const productManager = new ProductManager(productsFilePath);

//Listado de todos los productos:
router.get("/", async (req, res) => {
  try {
    const array = await productManager.getProducts();
    res.render("home", { array });
  } catch (error) {
    console.log(error);
  }
});

//Formularios add y delete de productos:
router.get("/realtimeproducts", async (req, res) => {
  try {
    const array = await productManager.getProducts();
    res.render("realTimeProducts", { array });
  } catch (error) {
    console.log(error);
  }
});

export default router;
