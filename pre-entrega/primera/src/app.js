import express from "express";
import routerProducts from "./routes/products.router.js"

//Deberia implementar el router de productos en la ruta  /api/products



const app = express();
//Tenia como segundo parametro: routerProducts
app.use(express.json());
app.use("/api/products", routerProducts );

//Para el carrito, el cual tendrá su router en /api/carts/, configurar dos rutas:

//app.use("/api/carts", routerCarts);

/*
import ProductManager from "./ProductManager.js";


//instancia de la clase
const manager = new ProductManager("../files/products.json");

//Mostrar todos los productos con la opcion de agregar un limit
app.get("/products", async (req, res) => {
  const limit = Number(req.query.limit);
  const products = await manager.getProducts(limit);
  res.send(products); //Con express se sobreenteinde que en esta respuesta estamos retornando un codigo 200
});

//Mostrar producto filtrado por id
app.get("/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  const products = await manager.getproductById(id);
  res.send(products);
});
*/
//Mostrar
app.listen(8080, () => console.log("Listening on 8080"));
