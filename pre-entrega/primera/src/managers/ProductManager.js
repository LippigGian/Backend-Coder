import { promises } from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  //JSON.parse convierte cadena de texto en archivo JS
  getProducts = async (limit) => {
    try {
      const products = await promises.readFile(this.path, "utf-8");
      if (limit) {
        const productsParse = JSON.parse(products);
        const productLimited = productsParse.slice(0, limit);
        return { productLimited };
      }
      //obtengo los datos que vienen en formato string y los parseo.
      return JSON.parse(products);
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  getproductById = async (id) => {
    try {
      //await para esperar al meotodo getproducts
      const products = await this.getProducts();
      const productId = products.find((producto) => producto.id == id);
      if (!productId) {
        return { error: "Producto no encontrado" };
      }
      return { productId };
    } catch (error) {
      console.log(error);
    }
  };
}
