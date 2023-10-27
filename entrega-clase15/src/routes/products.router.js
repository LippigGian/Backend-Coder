import { Router } from "express";
// import ProductManager from "../managers/products.manager.js" ESTE IMPORT ES PARA TRABAJAR CON ARCHIVOS DE FILESYSTEM 
import Products from "../dao/dbManagers/products.managers.js";

// const productManager = new ProductManager("./managers/files/productos.json")

const products =[];
const router = Router();

const productsManager = new Products();

//TRABAJANDO CON BD

router.get("/", async (req,res)=>{
    try {
       const products = await productsManager.getAll();
       res.send({status: "success", payload: products}); 
    } catch (error) {
        res.status(500).send({status: "error", message: error.message});
    }
});


router.post("/", async (req,res)=>{
    try {
     const {title, description, price} = req.body;
     if(!title || !description || !price){
         return res.status(400).send({status: "error", message: "incomplete values"})
     }
     const result = await productsManager.save({
         title,
         description,
         price
     });
     //En el post estoy creando un nuevo recurso, por lo que debo devolver un 201;
     res.status(201).send({status: "success", payload: result});
    } catch (error) {
     res.status(500).send({status: "error", message: error.message});
    } 
 });







//ARCHIVOS LOCALES
// //Mostrar producto filtrado por id
// router.get("/:pid", async (req, res) => {
//     const id = Number(req.params.pid);
//     const products = await productManager.getproductById(id);
//     res.send(products);
//   });


// //La ruta raíz POST / deberá agregar un nuevo producto con los campos:
// router.post("/",async (req,res)=>{
//     const product=req.body;
//     const newProduct = await productManager.createProduct(product);
//     res.send(newProduct)
// })


// //a ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.

// router.put("/:pid",async(req,res)=>{
//     const productActualizado = req.body;
//     const productId = parseInt(req.params.pid);
//     const productoActualizado = await productManager.modifyProduct(productActualizado, productId)
//     res.send(productoActualizado)
// })


// router.delete("/:pid", async (req,res)=>{
//     const productId = parseInt(req.params.pid);
//     const resp = await productManager.deleteProducts(productId);
//      res.send(resp);  
// })

export default router;