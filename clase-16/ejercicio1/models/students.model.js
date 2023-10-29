//Primero damos el nombre a la coleccion  con la que trabajaremos
//Luego definimos nuestro esquema
//Finalmente definiremos nuestro modelo.

import mongoose from "mongoose";

const studentsCollection = "students";

const studentsSchema = new mongoose.Schema({

//Definimos los atributos de nuestra coleccion de estudiantes:
first_name: {
    //Tipo de campo:
    type: String,
    //Obligatoriedad del atributo
    require: true
},
last_name: {
    type: String,
    require: true
},
email: {
    type: String,
    require: true,
    //Que el mail sea unico:
    unique: true
},
dni: Number,
birth_date: Date,
gender: {
    type: String,
    //Limitamos los string que podremos recibir:
    enum: ["M", "F"]
    //Cualquier otra cadena de texto la rechazaremos.
},
courses:{
    //Vamos a definir la referencia al a coleccion de cursos:
    type: [{
        courses: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "courses"
            //Esto significa que le pasaremos el ID, es decir el ObjectId del curso, como se llama la referencia? En este caso es "courses"
        }
    }],
    //Le daremos un valor por defecto:
    default: []
}
});

//Middleware:
//Cada vez que yo haga un find, deberá pasar lo siguiente:
studentsSchema.pre("find", function() {
    this.populate("courses.courses");
});

//Definir el modelo
//Le paso como parametro la coleccion que voy a utilizar y el nombre del esquema a utilizar
export const studentsModel = mongoose.model(studentsCollection, studentsSchema );
