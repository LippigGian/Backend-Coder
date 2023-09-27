import { Router } from "express";

const router = Router();
const users = [];
//Obtener listado de mascotas
//En lugar de utilizar el app:
router.get("/", (req,res)=>{
    res.send({status: "success", payload: users})
})

router.post("/",(req,res)=>{
    const user = req.body;
    if(!user.name){
        return res.status(400).send({status: "error", error: "Incomplete value"})
    }
    users.push(user);
    res.send({status: "success", payload: user})
})

export default router;
