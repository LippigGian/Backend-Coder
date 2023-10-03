import fs from 'fs';
import { promises } from "fs";

export default class CartManager {
  constructor(path) {
    this.path = path;
  }
  //Obtener todos los carritos
  getCarts = async () => {
    try {
      const products = await promises.readFile(this.path, "utf-8");
      return JSON.parse(products);
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Guardar los cambios del carrito
  saveCarts = async (cart) =>{
    fs.promises.writeFile(this.path, JSON.stringify(cart, null, "\t"))
   }
   //Obtener carritos por id
   getCartById = async (id) => {
    try {
      const carts = await this.getCarts();
      const cartId =  carts.find((cart) => cart.id == id);
      if (!cartId) {
        return { error: "Carrito no encontrado" };
      }
      return { cartId };
    } catch (error) {
      console.log(error);
    }
  };

  createCart = async (cart) =>{
    const carts = await this.getCarts();
    cart.products=[];
    if(carts.length === 0){
        cart.id = 1;
        
      }else{
        cart.id = carts[carts.length -1].id +1
      }
    carts.push(cart)   
    this.saveCarts(carts)
    return({status: "Success", message:"Carrito creado con exito"})
  }

  modifyCart = async (cartId, productId)=>{
    
//Obtengo todos los carritos
const carts = await this.getCarts();
//Busco en CARTS el carrito al que voy a agregar un producto:
const cartById = await this.getCartById(cartId)
// const cartById = carts.find((cart) => cart.id == cartId);
const cartIndex = carts.findIndex(cart => cart.id ===cartId)
// console.log(productId)
if (cartIndex === -1) {
  console.log("error, carrito no encontrado")
    return("Error, producto no encontrado")
   
//   return { error: "Carrito no encontrado" };
}else{
    

console.log(cartById)

 const indexProductCart = carts[cartIndex].products.findIndex(product => product.id == productId);
if(indexProductCart !=-1)
{
//     carts[cartIndex].products[indexProductCart]=carts[cartIndex].products[indexProductCart].quantity++;
carts[cartIndex].products[indexProductCart].quantity++;
    console.log("entro en el if")
}else{
    carts[cartIndex].products.push({id:productId,quantity:1})
    console.log("Entro en el else")
}
console.log(indexProductCart)

cartManager.saveCarts(carts)
  }}
}
