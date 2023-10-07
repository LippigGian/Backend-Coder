import express from "express";
import routerProducts from "./routes/products.router.js"
import routerCart from "./routes/carts.router.js";
import __dirname from "./utils.js";
import {Server} from "socket.io";
import handlebars from "express-handlebars"
import viewsRouter from "./routes/views.router.js"



const app = express();
app.use(express.json());


//Routes
app.use("/", viewsRouter);
// app.use("/api/products", routerProducts );

// app.use("/api/carts", routerCart);

//Servidor archivos estaticos:
app.use(express.static(`${__dirname}/public`));


//Motor de plantillas:

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");



//Mostrar
const server = app.listen(8080, () => console.log("Server running"));

//Configuracion del socket
const socketServer = new Server(server);


//Trabajando desde home.js
const logs = [];
socketServer.on("connection", socket =>{

    console.log("Nuevo cliente conectado");

    //     //Caputrar el evento mensaje del lado del cliente

    socket.on("message", data=>{
        console.log(data)
    });

    // socket.on("message1", data =>{
    //     //Crea un evento log y envia data a todos los clientes conectados
    //     socketServer.emit("log", data);
    // })
    // socket.on("message2", data =>{
    //     logs.push({socketid: socket.id, message: data})
    //     socketServer.emit("log", {logs});
    // })
})


