//Resolver un crud de usuarios
import  express from "express";

const app = express();

//Hay que especificar que vamos a trabajar en formatos JSON.
//Middleware
app.use(express.json());

const users = [];
const usuarios = [
	{ id: 1, nombre: 'Alex', apellido: 'Pinaida', edad: 28, genero: 'M' },
	{ id: 2, nombre: 'Alejandro', apellido: 'Resk', edad: 25, genero: 'M' },
	{ id: 3, nombre: 'Nora', apellido: 'Saucedo', edad: 22, genero: 'F' }
];

//obtencion de usuarios

app.get("/users", (req,res) =>{
    res.send(users) //Con express se sobreentiende que en esta respuesta estamos retornando un codigo 200
})

//Crear un recurso (POST)
app.post("/users", (req,res)=>{
    
    //Aqui recibiremos un objeto con nombre, apellido, etc
    //Lo obtendremos del objeto request, dentro del body.

    //Este objeto lo vamos a enviar desde POSTMAN.
    const user = req.body;
    //Validaciones. Validare en este caso que el cliente nos envie el nombre y el apellido.
    if(!user.first_name || !user.last_name)
    {
        //En este caso seria error del cliente porque no envia los atributos obligatorios
        return res.status(400).send({status:"error", error: "Incomplete values"})
        //Implementamos el codigo http .status(400) (tambien podria ser statusCode()) que indica error por parte del cliente.
    }
    if(users.length ===0)
    {
        user.id = 1;
    }else{
        user.id = users[users.length -1 ].id +1
    }
    users.push(user);
    //Se sobreentiende que será un status 200
    //Debemos retornar un 201, porque estamos creando un nuevo recurso:
    res.status(201).send({status: "success", message: "User created"});
})

//Actualizar recurso (PUT)
app.put("/users/:id",(req,res)=>{
    //Primero enviamos el id de usuario que queremos actualizar
    //Luego enviamos el body del usuario con lso campos actualizados
    const user= req.body;
    //El id viene como string
    const userId = Number(req.params.id);
    //Verificaciones:
    if(!user.first_name || !user.last_name)
    {
                return res.status(400).send({status:"error", error: "Incomplete values"})
    }
    const index = users.findIndex(user => user.id === userId);
    if(index !== -1)
    {   
        // user.id = index+1;
        //Hay una mejor manera para hacer que el id no se borre y es con el spread operator:
        const newUser = {id: userId, ...user}
        users[index] = newUser;
        res.send({status: "success", message: "User updated succesfully"});
    }else{
        //Error 404 que dice que no se encontro el id
        res.status(404).send({status:"error", error: "User not found"})
    }
})

//Eliminar un recurso
app.delete("/users/:id", (req,res)=>{
    const userId = Number(req.params.id);
    const index = users.findIndex(user => user.id === userId);
    if(index !== -1)
    {
        users.splice(index, 1)
        res.send({status: "success", message: "User deleted succesfully"});
    }else{
        //Error 404 que dice que no se encontro el id
        res.status(404).send({status:"error", error: "User not found"})
    }

})

//Actualizacion parcial con patch

app.patch("/users/:id", (req,res)=> {
    const userToUpdate = req.body;
    const userId = Number(req.params.id);

    const index = users.findIndex(user => user.id === userId);
    if(index !== -1)
    {   
        //Primero guardo los datos del usuario al que voy a actualizar:
        const user = users[index];
        //Ahora actualizo con los nuevos elementos de forma parcial:
        users[index]= Object.assign(user, userToUpdate);
        //Tambien podria hacer algo asi con el spread operator:
        //newUser = {...user, ...userToUpdate}
        //Tambien podria agregar unas validaciones para que no me permitan actualizar los IDS
        res.send({status: "success", message: "User updated succesfully"});
    }else{
        //Error 404 que dice que no se encontro el id
        res.status(404).send({status:"error", error: "User not found"})
    }

})

app.listen(8080, ()=>console.log("listening on port 8080"));