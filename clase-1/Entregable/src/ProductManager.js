const fs = require("fs");
import {promises} from "fs"

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }
  

  getProducts = async () => {
    try {
      //Validamos si nuestro archivos se encuentra creado o no.
      //En este caso necesitaremos el metodo sincronico EXIST ya que no existe ni en callbacks ni en metodos asincronicos algo similar.

      if (fs.existsSync(this.path)) {
        //En el caso que exista voy a leer su contenido. Caso contrario devuelvo array vacio. Asi vuelve a empezar de 0.
        //Leo el archivo y le digo la codificacion
        const data = await fs.promises.readFile(this.path, "utf-8");
        //obtengo los datos que vienen en formato string y los parseo.
        const products = JSON.parse(data);
        //retornamos arreglo de objetos.
        return products;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };

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
  getProductById = async (id) => {
    try {
      const products = await this.getProducts();
      const productId = products.find((productos) => productos.id === id);
      if (productId) {
        console.log("Producto por ID encontrado: ");
        console.log(productId);
        console.log(typeof productId);
        return productId;
      } else {
        console.log("producto por ID no encontrado");
      }
    } catch (error) {
      console.log(error);
    }
  };
/*consigna: 
Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, 
así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y 
debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID 

*/
  updateProduct = async (id, productoActualizar) => {
    try {
      const products = await this.getProducts();
      const indice = products.findIndex((product) => product.id === id);
      products[indice]=productoActualizar;
      products[indice].id = id;
        console.log(id, productoActualizar)
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, "\t")
        );
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (id) => {
    try {
      const products = await this.getProducts();
      const indice = products.findIndex((product) => product.id === id);

      if (indice !== -1) {
        // console.log(`El indice es: ${indice} y el id es: ${products[indice].id}`);
        products.splice(indice, 1);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, "\t")
        );
        console.log(`El producto con id: ${id} fue eliminado con exito`);
      } else {
        console.log(`No se encontró ningun producto con el id ${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };


}



// module.exports = {
//   ProductManager,
// };
