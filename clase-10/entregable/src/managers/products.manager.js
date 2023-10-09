import fs from "fs";
import { promises } from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  getProducts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(data);
        return products;
      } else {
        // console.log("entro en el else, no se encontro array con productos")
        return [];
      }
    } catch (error) {
      console.log(error);
      // throw error;
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

  modifyProduct = async (producto, id) => {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((product) => product.id === id);
      if (index !== -1 && !producto.id) {
        const newProduct = { id: id, ...producto };
        products[index] = newProduct;
        this.saveProducts(products);
        return { status: "success", message: "Product updated succesfully" };
      } else {
        if (producto.id) {
          //Error 404 que dice que no se encontro el id
          return { status: "error", error: "No se debe modificar el id" };
        }
        //Error 404 que dice que no se encontro el id
        return { status: "error", error: "Product not found" };
      }
    } catch (error) {
      console.log(error);
    }
  };

  createProduct = async (product) => {
    try {
      const products = await this.getProducts();
      if (products.length === 0) {
        product.id = 1;
      } else {
        product.id = products[products.length - 1].id + 1;
      }
      products.push(product);
      this.saveProducts(products);
      return product;
    } catch (error) {
      console.log(error);
    }
  };

  addProduct = async (product) => {
    try {
      const allProducts = await this.getProducts();
      const newProduct = {
        title: product,
        id:
          allProducts.length === 0
            ? 1
            : allProducts[allProducts.length - 1].id + 1,
      };
      allProducts.push(newProduct);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(allProducts, null, "\t")
      );
      return product;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  deleteProducts = async (id) => {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((product) => product.id === id);
      console.log(index);
      if (index !== -1) {
        products.splice(index, 1);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, "\t")
        );
        return {
          status: "Succes",
          message: `Product ID: ${id} deleted succesfully `,
        };
      } else {
        return {
          status: "error",
          message: `Product ID: ${id} no se encontro `,
        };
      }
    } catch (error) {
      console.log(error);
    }
  };
}
