//Deberemos establecer la conexion con la base de datos:

import  express  from "express";
import mongoose from "mongoose";
import usersRouter from "./routes/users.router.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/users", usersRouter);


//Establecer conexion con la BDD.
try {
    //Pasamos como parametro el STRING de conexion.
    //Este lo obtenemos en mongodb.cloud en la parte de drivers.
    //Tendremos que modificar el nombre del parametro y la contrasena
    //Si no le pasamos como parametro la base de datos con la que queremos trabajar creará por default una base de datos
    //llamada TEST. El nombre se lo pasamos luego del mongodb.net/ y antes del "?"
    await mongoose.connect("mongodb+srv://Gianfranco:Yoy1WBNnp6Mo0SgG@cluste55575gl.fuje07k.mongodb.net/clase14?retryWrites=true&w=majority")
    console.log("BDD conectada")
} catch (error) {
    console.log(error.message)
}

app.listen(8080);