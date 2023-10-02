import fs from 'fs';
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
  // createUser = async (usuario) =>{
  //   try{
  //       //Primero obtengo todos los datos que se encuentren en el archivo (usuarios) hasta el momento.
  //       //Aqui aplicamos la retulizacion de codigo:
  //       const users = await this.getUsers();
  //       //Ahora podremos crear nuestro nuevo usuario.
  //       if(users.length === 0){
  //         usuario.id = 1;
  //       }else{
  //         usuario.id = users[users.length -1].id +1
  //       }
  //       //insertamos el elemento o usuario
  //     users.push(usuario)

  //     //una vez que ya hemos terminado el procesamiento guardamos el arreglo dentro de nuestro archivo.
  //     await fs.promises.writeFile(this.path, JSON.stringify(users, null, "\t"))

  //     return usuario;
  //   }catch(error){
  //     console.log(error)
  //   }
  // }

  saveProducts = async (products) =>{
    // console.log(products)
    fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
   }
}

/*
  addProduct = async (productos) => {
    try {
      //Primero obtengo todos los datos que se encuentren en el archivo (usuarios) hasta el momento.
      //Aqui aplicamos la retulizacion de codigo:
      const products = await this.getProducts();
      //Ahora podremos crear nuestro nuevo usuario.
      if (products.length === 0) {
        productos.id = 1;
      } else {
        productos.id = products[products.length - 1].id + 1;
      }
      //insertamos el elemento o usuario
      products.push(productos);

      //una vez que ya hemos terminado el procesamiento guardamos el arreglo dentro de nuestro archivo.
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );

      return productos;
    } catch (error) {
      console.log(error);
    }
  };
  */