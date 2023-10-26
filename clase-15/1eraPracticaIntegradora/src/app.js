//Tendremos 2 managers. 1 para trabajar con nuestros archivos y otro para trajabarla conexion con la bdd
//La idea es que nuestro proyecto deberia ser capaz de poder  trabajar tanto con datos a nivel de archivos y con los datos a nivel de bdd

//Trabajaremos de la parte mas interna a lA Mas externa.
//arrancamos con los datos y luego con las vistas que seria lo que va a ver el usuario.

//Una vez resuelta la parte mas interna en courses.model.js y students.model.js iremos a la parte de managers
//En los managers definiremos los metodos para hacer la obtecion de los datos

//En los managers (Students y courses) unicamente tienen la responsabilidad de acceder, persistir o modificar los datos, NO lleva logica de negocio
//En el router podremos implementar la logica de negocio. Por ejemplo calcular el stock al momento de realizar una commpra.


//Try y catch. se utiliza en la capa mas externa. En este caso los routes.





//PRimero hicimos los models.js
//Segundo los managers.js
//Tercero los routers.js
//Cuarto el router de vistas (views.router.js)
//Aqui termino la parte de backend. Ahora iremos por el frontend con las vistas, etc.

//Iremos al layouts y haremos todos los handlebars
//Primero crearemos el main donde recibiremos el body y lo mostraremos por pantalla
//Segundo crearemos nuestras vistas (en este caso seran 2, courses y students)
//Tercero levantamos nuestro servidor en express en la app.js

import express from "express";
import studentsRouter from "./routes/students.router.js";
import coursesRouter from "./routes/courses.router.js";
import viewsRouter from "./routes/views.router.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import __dirname from "./utils.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine("handlebars", handlebars.engine());

app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/students", studentsRouter);
app.use("/api/courses", coursesRouter);


//Conexion con la base de datos
try {
    await mongoose.connect("mongodb+srv://Gianfranco:Yoy1WBNnp6Mo0SgG@cluste55575gl.fuje07k.mongodb.net/practicaIntegradora?retryWrites=true&w=majority");
    console.log("BDD conectada");
    
} catch (error) {
    console.log(error.message);
}

app.listen(8080, ()=> console.log("Server runing"));