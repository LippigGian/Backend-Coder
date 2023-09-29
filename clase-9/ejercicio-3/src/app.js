import express from "express";
import handlebars from "express-handlebars";
import  {__dirname}  from "./utils.js";
import viewsRouter from "./routes/views.router.js"

const app = express();

//Vamos a configurar nuestro motor de plantillas.
//primer parametro especifico con que motor de plantillas voy a trabajar

app.engine("handlebars", handlebars.engine());
//Luego especifico en que carpeta estoy guardando nuestras vistas
app.set("views", `${__dirname}/views`)
app.set("view engine", "handlebars")

// const food = 
// [
//   {
// 	name: "Pizza",
// 	price: 100
//   },
//   {
// 	name: "Banana",
// 	price: 50
//   },
//   {
// 	name: "Soda",
// 	price: 75
//   },
//   {
// 	name: "Ensalada",
// 	price: 80
//   },
//   {
// 	name: "Fruta",
// 	price: 90
//   }
// ];

// app.get("/",(req,res)=>{
// 	const testUser = {
// 		name: "Rodrigo",
// 		role: "admin"
// 	};
//     res.render("food", {user: testUser, isAdmin: testUser.role=== "admin",
// food});
// })


//Archivos estaticos:

/*
Archivos estaticos
*/

//Middleware incorporado que es propio de express: No necesitamos trabajar su implementacion, ya viene aplicada por defecto.
app.use("/static-files", express.static(`${__dirname}/public`));

app.use("/",viewsRouter)

//Middleware de manejo de erorres, siempre debe ir al final.
app.use((err, req,res,next)=>{
    console.log(err.message);
    res.status(500).send({error: err.message});
})
app.listen(8080, ()=>console.log("Server running"))