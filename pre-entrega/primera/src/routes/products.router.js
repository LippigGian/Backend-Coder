import { Router } from "express";
import ProductManager from "../managers/products.manager.js"

const productManager = new ProductManager("./managers/files/productos.json")
/*La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior

*/
const products =[];
const router = Router();

//deberemos trabajr router.get en la ruta raiz y trabajar la implementacion:
router.get("/", async (req,res)=>{
    const limit = Number(req.query.limit);
    const products = await productManager.getProducts(limit);
    // res.send(console.log("llego piola"))
    res.send(products)
    // res.send({status: success, payload: products }); //Con express se sobreenteinde que en esta respuesta estamos retornando un codigo 200
})



//Mostrar producto filtrado por id
router.get("/:pid", async (req, res) => {
    const id = Number(req.params.pid);
    const products = await productManager.getproductById(id);
    res.send(products);
  });


//La ruta raíz POST / deberá agregar un nuevo producto con los campos:
/*id: Number/String (A tu elección, el id NO se manda desde body, se autogenera como lo hemos visto desde los primeros entregables, asegurando que NUNCA se repetirán los ids en el archivo.
title:String,
description:String
code:String
price:Number
status:Boolean
stock:Number
category:String
thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto
Status es true por defecto.
Todos los campos son obligatorios, a excepción de thumbnails
*/

  // Verificar si los campos requeridos existen en el cuerpo de la solicitud
//   if (!title || !description || !code || !price || !stock || !category) {
//     return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes.' });
//   }

// createUser = async (usuario) =>{
//     try{
//         //Primero obtengo todos los datos que se encuentren en el archivo (usuarios) hasta el momento.
//         //Aqui aplicamos la retulizacion de codigo:
//         const users = await this.getUsers();
//         //Ahora podremos crear nuestro nuevo usuario.
//         if(users.length === 0){
//           usuario.id = 1;
//         }else{
//           usuario.id = users[users.length -1].id +1
//         }
//         //insertamos el elemento o usuario
//       users.push(usuario)

//       //una vez que ya hemos terminado el procesamiento guardamos el arreglo dentro de nuestro archivo.
//       await fs.promises.writeFile(this.path, JSON.stringify(users, null, "\t"))

//       return usuario;
//     }catch(error){
//       console.log(error)
//     }
//   }


router.post("/", async (req,res)=>{
    const product = req.body;
    console.log(product)
    const products = await productManager.getProducts();
    
    if(!product.title || !product.description ||!product.code || !product.price || !product.status || !product.stock || !product.category){
        return res.status(400).send({error: "Todos los campos deben completarse"})
    }
    if(products.length === 0){
        product.id = 1;
      }else{
        product.id = products[products.length -1].id +1
      }
      //insertamos el elemento o usuario
    products.push(product)
    // console.log(user)
    //Nuevamente guardar en el archivo TODOS los carritos
//await cartManager.save(carts)
    productManager.saveProducts(products)
    res.send(product)
})


/*
router.post("/",(req,res)=>{
    const user = req.body;
    if(!user.name){
        return res.status(400).send({status: "error", error: "Incomplete value"})
    }
    users.push(user);
    res.send({status: "success", payload: user})
})
*/


//a ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.

router.put("/:pid", async (req,res)=>{
    const productActualizado = req.body;
    const productId = parseInt(req.params.pid);
    // console.log(id)
    const products = await productManager.getProducts();
    const index = products.findIndex(product => product.id === productId)
    console.log(index)
    if(index !== -1 && !productActualizado.id )
    {   
        // user.id = index+1;
        //Hay una mejor manera para hacer que el id no se borre y es con el spread operator:
        const newProduct = {id: productId, ...productActualizado}
        products[index] = newProduct;
        productManager.saveProducts(products)
        res.send({status: "success", message: "Product updated succesfully"});
    }else{
        if(productActualizado.id){
            //Error 404 que dice que no se encontro el id
        return res.status(404).send({status:"error", error: "No se debe modificar el id"})
        }
        //Error 404 que dice que no se encontro el id
        res.status(404).send({status:"error", error: "Product not found"})
    }
    // console.log(productActualizado)
    // console.log(products)
    // res.send({status: "success", message: "User updated succesfully"})
})

//La ruta DELETE /:pid deberá eliminar el producto con el pid indicado. 

// router.delete("/:pid", async (req,res)=>{
//     const productId = parseInt(req.params.pid);
//     const products = await productManager.getProducts();
//     const index = products.findIndex((product) => product.id === productId);
//     console.log(index)
//     if (index !== -1) {
//         // console.log(`El indice es: ${indice} y el id es: ${products[indice].id}`);
//         products.splice(index, 1);
//         productManager.saveProducts(products)
//         res.send({status: "success", message: `Product ID: ${productId} deleted succesfully ` });

//         // await fs.promises.writeFile(
//         //   this.path,
//         //   JSON.stringify(products, null, "\t")
//         // );
//         // console.log(`El producto con id: ${id} fue eliminado con exito`);
//       } else {
//         res.send({status: "error", message: `Product ID: ${productId} no se encontro ` });
//         // console.log(`No se encontró ningun producto con el id ${productId}`);
//       }
// })


router.delete("/:pid", async (req,res)=>{
    const productId = parseInt(req.params.pid);
    const resp = await productManager.deleteProducts(productId);
     res.send(resp);
   
})


/*app.put("/users/:id",(req,res)=>{
    //Primero enviamos el id de usuario que queremos actualizar
    //Luego enviamos el body del usuario con lso campos actualizados
    const user= req.body;
    //El id viene como string
    const userId = Number(req.params.id);
    //Verificaciones:
    if(!user.first_name || !user.last_name)
    {
                return res.status(400).send({status:"error", error: "Incomplete values"})
    }
    const index = users.findIndex(user => user.id === userId);
    if(index !== -1)
    {   
        // user.id = index+1;
        //Hay una mejor manera para hacer que el id no se borre y es con el spread operator:
        const newUser = {id: userId, ...user}
        users[index] = newUser;
        res.send({status: "success", message: "User updated succesfully"});
    }else{
        //Error 404 que dice que no se encontro el id
        res.status(404).send({status:"error", error: "User not found"})
    }
})

*/

/*La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.
La ruta DELETE /:pid deberá eliminar el producto con el pid indicado. 

*/

//MINUTO 7 DEL AFTERCLASS
router.delete("/:pid")

export default router;