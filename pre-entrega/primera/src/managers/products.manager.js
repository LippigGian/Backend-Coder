import fs from 'fs';
import { promises } from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

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

  modifyProduct = async (producto, id)=>{
    try {
      const products = await this.getProducts();
    const index = products.findIndex(product => product.id === id)
    if(index !== -1 && !producto.id )
    {   
        const newProduct = {id: id, ...producto}
        products[index] = newProduct;
        this.saveProducts(products)
        return({status:"success", message:"Product updated succesfully"})
        
    }else{
        if(producto.id){
            //Error 404 que dice que no se encontro el id
        return ({status:"error", error: "No se debe modificar el id"})
        }
        //Error 404 que dice que no se encontro el id
        return ({status:"error", error: "Product not found"})
    }
    } catch (error) {
      console.log(error);
    }
    

  }
  
  createProduct = async(product) =>{
    try {
      
    const products = await this.getProducts();
    if(!product.title || !product.description ||!product.code || !product.price || !product.status || !product.stock || !product.category){
            return ({error: "Todos los campos deben completarse"})
 }
  if(products.length === 0){
      product.id = 1;
    }else{
      product.id = products[products.length -1].id +1
    }
  products.push(product)
  this.saveProducts(products)
  return(product)
      
    } catch (error) {
      console.log(error);
    }

  }

  saveProducts = async (products) =>{
    // console.log(products)
    fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
   }

   deleteProducts = async(id) =>{
    try {
      const products = await this.getProducts();
      const index = products.findIndex((product) => product.id === id);
      console.log(index)
      if (index !== -1) {
        products.splice(index, 1);
      await  this.saveProducts(products)
       return({status:"Succes", message: `Product ID: ${id} deleted succesfully ` }) 
      } else {
        return({status: "error", message: `Product ID: ${id} no se encontro ` })
      }
    } catch (error) {
      console.log(error);  
    }
  }

}


  
    
// router.delete("/:pid", async (req,res)=>{
//   const productId = parseInt(req.params.pid);
//   const products = await productManager.getProducts();
//   const index = products.findIndex((product) => product.id === productId);
//   console.log(index)
//   if (index !== -1) {
//       // console.log(`El indice es: ${indice} y el id es: ${products[indice].id}`);
//       products.splice(index, 1);
//       productManager.saveProducts(products)
//       res.send({status: "success", message: `Product ID: ${productId} deleted succesfully ` });

//       // await fs.promises.writeFile(
//       //   this.path,
//       //   JSON.stringify(products, null, "\t")
//       // );
//       // console.log(`El producto con id: ${id} fue eliminado con exito`);
//     } else {
//       res.send({status: "error", message: `Product ID: ${productId} no se encontro ` });
//       // console.log(`No se encontró ningun producto con el id ${productId}`);
//     }
// })

