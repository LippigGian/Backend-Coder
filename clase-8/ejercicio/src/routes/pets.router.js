import { Router } from "express";

const router = Router();
const pets = [];
//Obtener listado de mascotas
//En lugar de utilizar el app:
router.get("/", (req,res)=>{
    res.send({status: "success", payload: pets})
})

router.post("/",(req,res)=>{
    const pet = req.body;
    if(!pet.name){
        return res.status(400).send({status: "error", error: "Incomplete value"})
    }
    pets.push(pet);
    res.send({status: "success", payload: pet})
})


export default router;
