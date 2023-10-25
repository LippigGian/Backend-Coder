//definimos nuestro modelo.
import mongoose from "mongoose";

//Vamos a especificar el nombre de la coleccion
//"users" Va a ser el nombre que va a figurar dentro de la collection de la BDD
const userCollection = "users";

//Vamos a definir el esquema de nuestro documento. Es decir a los atributos que va a tener el usuario.

const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    
    //Le podemos decir que el email no puede repetirse.
    email: {
        type: String,
        //Le agrego la regla adicional.
        unique: true
    }
});

//Parte funcional de nuestro modelo. Es decir la parte para pdoer interactuar ocn mi base de datos. 
//(Consultas, transaacciones, escrituras ,actualizacion o eliminaciones)

export const usersModel = mongoose.model(userCollection, usersSchema);

//Con la constante userModel voy a poder hacer las interacciones a la base de datos en la capa de ruteo.

