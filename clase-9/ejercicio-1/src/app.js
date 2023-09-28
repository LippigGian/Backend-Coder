import express from "express";
import handlebars from "express-handlebars";
import  {__dirname}  from "./utils.js";

const app = express();

//Vamos a configurar nuestro motor de plantillas.
//primer parametro especifico con que motor de plantillas voy a trabajar

app.engine("handlebars", handlebars.engine());
//Luego especifico en que carpeta estoy guardando nuestras vistas
app.set("views", `${__dirname}/views`)
app.set("view engine", "handlebars")


app.get("/",(req,res)=>{
    const testUser = {
        name: "Luciano"
    }
    //A diferencia de un servicio aqui no va res.status.send
    //Le digo a que archivo hay que enviarlo y que parametro le paso
    res.render("index", testUser)
})

app.listen(8080, ()=>console.log("Server running"))