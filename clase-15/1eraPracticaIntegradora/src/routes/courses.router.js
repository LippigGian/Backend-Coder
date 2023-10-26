import {Router} from "express";
import Courses from "../dao/dbManagers/courses.manager.js"

//Vamos a utilizar el mismo router para trabajar tanto con productos a nivel de archivo como productos en bdd.
//Simplemente cambiamos el import cada vez que corresponda.

const router = Router();
const coursesManager = new Courses();

router.get("/", async (req,res)=>{
    //Esta es la capa mas externa, utilizaremos try y catch.
    try {
       const courses = await coursesManager.getAll();
       res.send({status: "success", payload: courses}); 
    } catch (error) {
        res.status(500).send({status: "error", message: error.message});
    }
});

router.post("/", async (req,res)=>{
   try {
    const {title, description, teacher} = req.body;
    if(!title || !description || !teacher){
        return res.status(400).send({status: "error", message: "incomplete values"})
    }
    const result = await coursesManager.save({
        title,
        description,
        teacher
    });
    res.send({status: "success", payload: result});
   } catch (error) {
    res.status(201).send({status: "success", payload: result});
   } 
});

router.put("/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const {title, description, teacher} = req.body;
        if(!title || !description || !teacher){
            return res.status(400).send({status: "error", message: "incomplete values"})
        }
        //Como primer parametro es el id del curso que quiero actualizar,
        //Segundo parametro es los campos que quiero actualizar
        const result = await coursesManager.update(id, {title, description, teacher});
        res.send({status: "success", payload: result});
    } catch (error) {
        res.status(500).send({status: "error", message: error.message});
    }
});

export default router;