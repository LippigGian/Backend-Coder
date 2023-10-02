import fs from 'fs';
import { promises } from "fs";

export default class CartManager {
  constructor(path) {
    this.path = path;
  }
  getCarts = async (limit) => {
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
  saveCarts = async (cart) =>{
    // console.log(cart)
    fs.promises.writeFile(this.path, JSON.stringify(cart, null, "\t"))
   }

   getCartById = async (id) => {
    try {
      //await para esperar al meotodo getproducts
      const carts = await this.getCarts();
      // console.log(carts)
      const cartId =  carts.find((cart) => cart.id == id);
      if (!cartId) {
        // console.log(cartId)
        return { error: "Carrito no encontrado" };
      }
      return { cartId };
    } catch (error) {
      console.log(error);
    }
  };

  async save(obj) {
    //Aqui iria el metodo POST
    
  }

  async getById(id) {
    
  }

  async getProducts() {
    try {
      const products = await promises.readFile(this.path, 'utf-8');
      return JSON.parse(products);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async deleteById(id) {
    
  }

  async deleteAll() {
    
  }
}


/*getProducts = async (limit) => {
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
  */
