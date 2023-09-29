import {fileURLToPath} from "url";
import {dirname} from "path";
import multer from "multer";

//file URL to path nos permite obtener el path de donde estoy trabajando (escribir en consola pwd)

//dirname nos convierte el fileurlToPath en formato de ruta legible (nos crea el path absoluto)

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Definimos los parametros de configuracion de multer:
//Destino de donde quiero guardar mis archivos
//Nombre de archivos
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, `${__dirname}/public/img/pets`)
    },
    filename: (req, file, cb) =>{
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer({
    storage, onError: (err, next)=>{

        console.log(err.message);
        next();
    }
})

export{
    __dirname,
    uploader
}