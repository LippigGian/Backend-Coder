import express from "express";

//creando sv http utilizando express
const app = express();

const usuarios = [
	{ id: 1, nombre: 'Alex', apellido: 'Pinaida', edad: 28, genero: 'M' },
	{ id: 2, nombre: 'Alejandro', apellido: 'Resk', edad: 25, genero: 'M' },
	{ id: 3, nombre: 'Nora', apellido: 'Saucedo', edad: 22, genero: 'F' }
];

//Vamos a construir nuestro primer endpoint o servicio.
//Vamos a revisar la peticion http de tipo GET

//lleva 2 parametros. Primero la ruta a la cual queremos acceder ejemplo: localhost:8080/saludo
//como segundo parametro es el request
app.get("/saludo", (req, res) =>{
    res.send("Hola a todos este es mi primer endpoint desde express")
} )

app.get("/bienvenida", (req, res) =>{
    res.send( ` <h1 style="color:blue"> Bienvenido a mi primer servidor de express <h1> `)
})
//ruta con path param
app.get("/unparametro/:nombre", (req, res)=>{
    res.send(` Bienvenido ${req.params.nombre}` )
    
});
//Ahora con 2 path params:
app.get("/dosparametros/:nombre/:apellido", (req, res)=>{
    res.send(` Bienvenido ${req.params.nombre} ${req.params.apellido}` )
    });

//Debemos construir un servicio que mep ermita obtener un usuario con su id
//EL id del usuario que vamos a buscar lo obtenemos mediante un request.param
//Todo lo que enviemos como path param siempre sera una cadena de texto
app.get("/usuario/:id", (req, res)=>{
    const userId = Number(req.params.id)
    //Ahora que tengo el id busco el usuario
    const user = usuarios.find(user => user.id == userId)
    //En caso de no encontrar el usuario retorno un error
    if(!user) return res.send({error: "Usuario no encontrado"})
    //En caso que lo encuentre retorno el objeto encontrado (El user)
    res.send(user)
    });

//Query params:
app.get("/usuarios-query", (req,res) =>{
    //Todo lo que mande a traves de query params llega al req.query y se irá armando dinámicamente algo asi:
    // req.query{
    //     edad: 28,
    //     genero: "M",
    //     nombre: "Alex"
    // }
    const queryParams = req.query;
    res.send(queryParams)
})

app.get("/usuariosbusqueda", (req,res) =>{
    console.log("entramos a busuqeda")
//Primero obtenemos el genero del query param
const genero = req.query.genero;
//siempre importante hacer validaciones
if(!genero || (genero !== "F" && genero !== "M"))
{
    console.log("no llego el genero")
    return res.send({usuarios})
   
   
}
//filtramos los usuarios por genero
const usuariosFiltrados = usuarios.filter(user => user.genero === genero)
res.send({usuarios: usuariosFiltrados})

    // const queryParams = req.query;
    // res.send(queryParams)
})

//Ahora hay que levantar el servidor en algun puerto

app.listen(8080, ()=>console.log("listening on port 8080"))