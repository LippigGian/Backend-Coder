import express from "express";
import handlebars from "express-handlebars";
import  __dirname  from "./utils.js";
import {Server} from "socket.io";
import viewsRouter from "./routes/views.router.js"

const app = express();

//tendremos codigo JS en la carpeta public, por ende necesitamos la configuracion del servidor para que se encargue de servir 
//archivos estaticos:

//Servidor archivos estaticos:

app.use(express.static(`${__dirname}/public`));

//Motor de plantillas:
//Siempre seran las mismas 3 lineas cuando trabajemos con plantillas.

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

//Routes
app.use("/", viewsRouter);

const server = app.listen(8080, () => console.log("Server running"));

//Configuracion del socket
const socketServer = new Server(server);

//Configuracion para que quede "escuchando" un evento, en este caso el "connection"
// socketServer.on("connection", socket =>{
//     console.log("Nuevo cliente conectado");

//     //Caputrar el evento mensaje del lado del cliente

//     socket.on("message", data=>{
//         console.log(data)
//     });

//     //Enviar mensaje desde el servidor al cliente
//     //Mensaje privado, unicamente al socket conectado de manera individual
//     socket.emit("evento_socket_individual", "Este es un mensaje que solo lo debe recibir el socket");

//     //Mensaje para todos menos para el que se esta conectando
//     socket.broadcast.emit("evento_todos_menos_actual", "Lo veran todos menos el que envio el mensaje");

//     socketServer.emit("evento_todos", "Lo recibiran todos los clientes conectados INCLUYENDOME")
// })


//Trabajando desde home.js
const logs = [];
socketServer.on("connection", socket =>{
    socket.on("message1", data =>{
        //Crea un evento log y envia data a todos los clientes conectados
        socketServer.emit("log", data);
    })
    socket.on("message2", data =>{
        logs.push({socketid: socket.id, message: data})
        socketServer.emit("log", {logs});
    })
})