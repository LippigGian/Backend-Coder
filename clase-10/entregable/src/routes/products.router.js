import { Router } from "express";
import ProductManager from "../managers/products.manager.js";

const productManager = new ProductManager("./managers/files/productos.json");
/*La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior

*/
const products = [];
const router = Router();

//deberemos trabajr router.get en la ruta raiz y trabajar la implementacion:
router.get("/", async (req, res) => {
  const limit = Number(req.query.limit);
  const products = await productManager.getProducts(limit);
  // res.send(console.log("llego piola"))
  res.send(products);
  // res.send({status: success, payload: products }); //Con express se sobreenteinde que en esta respuesta estamos retornando un codigo 200
});

//Mostrar producto filtrado por id
router.get("/:pid", async (req, res) => {
  const id = Number(req.params.pid);
  const products = await productManager.getproductById(id);
  res.send(products);
});

//La ruta raíz POST / deberá agregar un nuevo producto con los campos:
router.post("/", async (req, res) => {
  const product = req.body;
  const newProduct = await productManager.createProduct(product);
  res.send(newProduct);
});

//a ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.

router.put("/:pid", async (req, res) => {
  const productActualizado = req.body;
  const productId = parseInt(req.params.pid);
  const productoActualizado = await productManager.modifyProduct(
    productActualizado,
    productId
  );
  res.send(productoActualizado);
});

router.delete("/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid);
  const resp = await productManager.deleteProducts(productId);
  res.send(resp);
});

export default router;
