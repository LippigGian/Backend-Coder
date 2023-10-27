import express from "express";
import productsRouter from "./routes/products.router.js";
// import coursesRouter from "./routes/courses.router.js";
// import viewsRouter from "./routes/views.router.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import __dirname from "./utils.js";


// import routerProducts from "./routes/products.router.js"
// import routerCart from "./routes/carts.router.js";


const app = express();
app.use(express.json());

app.use("/api/products", productsRouter );

// app.use("/api/carts", routerCart);

//Mostrar
// app.listen(8080, () => console.log("Listening on 8080"));




app.use(express.urlencoded({extended: true}));

app.engine("handlebars", handlebars.engine());

app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// app.use("/", viewsRouter);
// app.use("/api/students", studentsRouter);
// app.use("/api/courses", coursesRouter);


//Conexion con la base de datos
try {
    await mongoose.connect("mongodb+srv://Gianfranco:Yoy1WBNnp6Mo0SgG@cluste55575gl.fuje07k.mongodb.net/entregaPracticaIntegradora?retryWrites=true&w=majority");
    console.log("BDD conectada");
    
} catch (error) {
    console.log(error.message);
}

app.listen(8080, ()=> console.log("Server runing"));








//Cosas a hacer:

//Crear una base de datos llamada “ecommerce” dentro de tu Atlas, crear sus colecciones “carts”, “messages”, “products” y sus respectivos schemas.
//Check; falta llenar los archivos con su logica interna

//Reajustar los servicios con el fin de que puedan funcionar con Mongoose en lugar de FileSystem
//Hay que modificar los routes para que trabajen con la base de datos y no con filesystem
//Check; Falta cambiar la logica interna.

//Implementar una vista nueva en handlebars llamada chat.handlebars, la cual permita implementar un chat como el visto en clase. 
//Los mensajes deberán guardarse en una colección “messages” en mongo (no es necesario implementarlo en FileSystem). 
//El formato es:  {user:correoDelUsuario, message: mensaje del usuario}
