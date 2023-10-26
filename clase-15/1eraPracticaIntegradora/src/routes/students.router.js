import {Router} from "express";
import Students from "../dao/dbManagers/students.manager.js"

//Vamos a utilizar el mismo router para trabajar tanto con productos a nivel de archivo como productos en bdd.
//Simplemente cambiamos el import cada vez que corresponda.

const router = Router();
const studentsManager = new Students();

router.get("/", async (req,res)=>{
    //Esta es la capa mas externa, utilizaremos try y catch.
    try {
       const students = await studentsManager.getAll();
       res.send({status: "success", payload: students}); 
    } catch (error) {
        res.status(500).send({status: "error", message: error.message});
    }
});

router.post("/", async (req,res)=>{
   try {
    const {first_name: firstName, last_name: lastName, dni, email, birth_date: birthDate, gender} = req.body;
    if(!firstName || !lastName || !email){
        return res.status(400).send({status: "error", message: "incomplete values"})
    }
    const result = await studentsManager.save({
        first_name: firstName,
        last_name: lastName,
        dni,
        email,
        birth_date: birthDate,
        gender
    });
    //En el post estoy creando un nuevo recurso, por lo que debo devolver un 201;
    res.status(201).send({status: "success", payload: result});
   } catch (error) {
    res.status(500).send({status: "error", message: error.message});
   } 
});


export default router;