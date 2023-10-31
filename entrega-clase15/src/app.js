import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js"
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import {Server} from "socket.io";
import Message from "./dao/dbManagers/messages.managers.js"



const app = express();
app.use(express.json());

//Direccion para ver los productos en el navegador
app.use("/", viewsRouter);

//Direccion para acceder por postman
app.use("/api/products", productsRouter );

//Direccion para acceder por postman
app.use("/api/carts", cartsRouter );




app.use(express.urlencoded({extended: true}));

app.engine("handlebars", handlebars.engine());

app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");


//Conexion con la base de datos
try {
    await mongoose.connect("mongodb+srv://Gianfranco:Yoy1WBNnp6Mo0SgG@cluste55575gl.fuje07k.mongodb.net/entregaPracticaIntegradora?retryWrites=true&w=majority");
    console.log("BDD conectada");
    
} catch (error) {
    console.log(error.message);
}
//Mostrar
const server = app.listen(8080, ()=> console.log("Server runing"));





//ANTERIOR



//Servidor archivos estaticos:
app.use(express.static(`${__dirname}/public`));


//Configuracion del socket
const socketServer = new Server(server);

//Mensajes de nuestros clientes que se van a ir guardando
 const messages = [];
 const myArray = [];

 //Funcion para que no se me vaya guardando por duplicado los mensajes en la BD.
 function agregarUltimoElemento(elemento) {
   // Eliminar el último elemento (si existe)
   if (myArray.length > 0) {
     myArray.pop();
   } 
   myArray.push(elemento);
 }

//configuracion con el servidor
socketServer.on("connection", socket =>{
//Mostrar cuando se conecta un nuevo cliente
console.log("Nuevo cliente conectado");

socket.on("message", data=>{
    //leemos el evento "message" recibido desde index.js y manejamos la data.
    messages.push(data);
    agregarUltimoElemento(data)
    //Guardamos en la BDD
    const message = new Message({
        user: data.user,
        message: data.message,
        timestamp: new Date(),
      });
    message.save(myArray)

    //Enviamos a todos los clientes el mensaje, luego restaria solo "pintarlos en pantalla"
    socketServer.emit("messageLogs", messages)
});




//Escuchar cuando se conecta un nuevo cliente.
socket.on("authenticated", data => {
//Cuando se conecta le voy a mostrar todos los mensajes al nuevo cliente que recien se conecta, no a todos.
socket.emit("messageLogs", messages);
//Mostrar nuevo usuario conectado 
socket.broadcast.emit("newUserConnected", data);
})
});