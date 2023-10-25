import {Router} from "express";
import { usersModel } from "../models/users.model.js";

const router = Router();

//CUALQUIER consulta de cualquier tipo que sea será ASINCRONICA.

//READ
router.get("/", async (req,res)=>{
    try {
        const users = await usersModel.find();
        //Tambien podemos aplicar un query. por ejemplo. "usersModel.find({first_name: "Gian"});"
        res.send({sstatus: "success", payload: users})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: error.message});
    }
})
//Get con filtros
router.get("/by-filters", async (req,res)=>{
    try {
        const {name, lastName, email} = req.query;
        //VAmos a buscar los usuarios que coinicidan el nombre o el apellido o el email
        const users = await usersModel.find({ $or: [{first_name: name},{last_name: lastName},{email: email}]})
        res.send({status: "success", payload: users});

    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: error.message});
    }
})

//Servicio para hacer una paginacion sencilla.
router.get("/paginated", async (req, res)=>{
    //Normalmente el front envia 2 parametros. La pagina a la que quiere acceder y cuantos registros quiere mostrar.

    try {
        //Creo el tamano size y le digo que por defecto sea 10.
    const {size= 10, page = 0}   = req.query;
    //logica para saltearse x cantidad de productos de acuerdo a la pagina que el usuario este.
    const skip = page*size;
    const users = await usersModel.find().skip(skip).limit(size);
    res.send({status: "success", payload: users});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: error.message});
    }
})
//Proyecciones: En este caso con email.
router.get("/by-email", async (req, res)=>{
    try {
        const {email} = req.query;
        //No le paso parametros por eso llaves vacias
        //Como segundo parametro voy a querer utilizar las proyecciones
        //Vamos a ordenar con SORT
        //operador $regex: sirve para buscar cualquier coincidencia que le pasemos, no hace falta que sea el campo exacto.
        //Regex sirve para hacer busquedas con experesiones regulares.
        //El operador para obviar las minusculas y mayusculas es la "i"
        // const users = await usersModel.find(
        //     { email: { $regex: new RegExp(email, "i") } },
        //     { first_name: 1, email: 1, _id: 0 }
        //   ).sort({ first_name: 1 });
          
        // const users = await usersModel.find(
        //     {email: { $regex: email}},
        //     {first_name:1, email: 1, _id: 0}
        //     ).sort({first_name: 1});
        const users = await usersModel.find(
            { email: { $regex: email, $options: "i" } },
            { first_name: 1, email: 1, _id: 0 }
          ).sort({ first_name: 1 });
          

        res.send({status: "success", payload: users});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: error.message});
    }
})
//Servicio para obtener los usuarios por ID:
router.get("/:uid", async (req,res)=>{
    try {
        const {uid} = req.params;
        const user = await usersModel.findOne({_id: uid});
        if(!user)
        {
            return res.status(404).send({status: "error", message: "User not found"});
        }
        res.send({status: "success", payload: user});

    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: error.message});
    }
})
//CREATE
router.post("/", async (req,res)=>{

    const {first_name, last_name, email} = req.body;
    if(!first_name || !last_name || !email)
    {
        return res.status(400).send({status: "error", message: "Incomplete values"});
    }
    try {
        const result = await usersModel.insertMany({
            first_name,
            last_name,
            email
        })
        //Tabmien en lugar de insertOne tenes usersModel.create()
        res.send({status: "success", payload: result});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: error.message});   
    }
});

//UPDATE
//Para actualizar necesito saber el id del documento que quiero actualizar
router.put("/:uid", async (req,res)=>{
    const {uid} = req.params;

    const userToReplace = req.body;

    if(!userToReplace.first_name || !userToReplace.last_name || !userToReplace.email)
    {
        return res.status(400).send({status: "error", message: "Incomplete values"});
    }
    try {
        const result = await usersModel.updateOne({_id: uid}, userToReplace)
        res.send({status: "success", payload: result})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: error.message});   
    }
})

//DELETE
router.delete("/:uid", async (req,res)=>{
    const {uid} = req.params;
    try {
        //Borrado fisico
        const result = await usersModel.deleteOne({_id: uid});
        res.send({status: "success", payload: result})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: error.message});  
    }
})
export default router;
