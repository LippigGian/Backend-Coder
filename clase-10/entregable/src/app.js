import express from "express";

import __dirname from "./utils.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";

import ProductManager from "./managers/products.manager.js";

const app = express();
app.use(express.json());

const productManager = new ProductManager("./managers/files/productos.json");
//Routes:
app.use("/", viewsRouter);

//Servidor archivos estaticos:
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));

//Motor de plantillas:
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

//Levantar server:
const server = app.listen(8080, () => console.log("Server running"));

//Configuracion del socket
const socketServer = new Server(server);
app.set("socketio", server);

socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  //Add products:
  socket.on("addProduct", async (data) => {
    try {
      console.log("entro al socke.on addProduct del backend");
      await productManager.addProduct(data);
      socket.emit("mostrartodo", await productManager.getProducts());
    } catch (error) {
      console.log(error);
    }
  });

  //Delete products:
  socket.on("deleteProduct", async (id) => {
    try {
      console.log("entro al socket.on de deleteProduct del backend");
      await productManager.deleteProducts(Number(id));
      socket.emit("mostrartodo", await productManager.getProducts());
    } catch (error) {
      console.log(error);
    }
  });
});
