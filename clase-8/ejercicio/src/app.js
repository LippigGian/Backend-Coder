import express from "express";
import petsRouter from "./routes/pets.router.js";
import usersRouter from "./routes/users.router.js";
import { __dirname } from "./utils.js";
const app = express();
//configuraciones
//Para que nuestra app funcione con formato json
app.use(express.json());

//Middleware a nivel de aplicacion:
app.use((req,res,next)=>{
    console.log("time: ",Date.now());
    //Una vez que imprime por consola, le decimos que continue
    next();
})

//Middleware a nivel de endpoint:
app.get("/test",middlewareNivelServicio, (req,res)=>{
    res.send({payload: {dato: req.dato1}})
})

//Middleware a nivel de ruta o servicio
function middlewareNivelServicio(req,res,next){
    req.dato1 = "Agregado a nivel del middleware";
    next();
}



//Para que podamos recibir distintos tipos de datosd y no solamente cadena de texto.
//Asi podremos recibir arrays, arrays de objetos, etc.
app.use(express.urlencoded({extended: true}));



app.use("/api/users",usersRouter);
app.use("/api/pets", petsRouter);


//Vamos a agregar configuración para servir archivos estáticos: (Hay que utilizar el path absoluto provisto por utils.js)
// app.use(express.static(`${__dirname}/public`));

//Puedo tambien poner un prefijo virtual. Esto sirve tambien para darle mas seguridad y no dar nuestra ruta raiz.
app.use("/static-files", express.static(`${__dirname}/public`));





app.listen(8080, ()=> console.log("Server running"));