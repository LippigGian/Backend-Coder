import { Router } from "express";
import { uploader } from "../utils.js";

const router = Router();
const pets = [];
//Obtener listado de mascotas


//Middleware a nivel de  router:

router.use((req,res,next) =>{
    console.log("Time router",Date.now());
    next();
})
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

router.post("/vw", uploader.single("thumbnail"),(req,res)=>{
    //Validamos que obligatoriamente el usuario deba enviar un archivo con la imagen de la mascota.
    const filename = req.file.filename;
    if(!filename)
    {
        return res.status(500).send({status: "error", error: "No se puede subir el archivo"})
    }
    const pet = req.body;
    if(!pet.name){
        return res.status(400).send({status: "error", error: "Incomplete value"})
    }
    pet.thumbnail = `http://localhost:8080/img/pets/${filename}`
    pets.push(pet);
    res.send({status: "success", payload: pet})
})

export default router;
