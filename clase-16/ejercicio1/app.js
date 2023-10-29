import mongoose from "mongoose";
import usersInfo from "./Users.json" assert {type: "json"};
import usersModel from "./models/users.model.js";
import { studentsModel } from "./models/students.model.js";
import { coursesModel } from "./models/courses.model.js";
const environment = async () =>{
    try {
        //Conexion a la base de datos:
        await mongoose.connect("mongodb+srv://Gianfranco:Yoy1WBNnp6Mo0SgG@cluste55575gl.fuje07k.mongodb.net/clase16?retryWrites=true&w=majority");

        //Insertar nuestra data de prueba:
        // const responseInsert = await usersModel.insertMany(usersInfo);
        // console.log(responseInsert);

        // const usersByNameStats = await usersModel.find({first_name: "jose"}).explain("executionStats");
        // console.log(usersByNameStats)
        //.explain("executionStats") nos dara las metricas de la busqueda. Los stats de ejecucion, como por ejemplo el tiempo de respuesta.

                //Crear Cursos:

        // await coursesModel.insertMany([{
        //     title: "Programacion Backend",
        //     description: "Programacion backend con Node.js",
        //     teacher: "Alex Pineda"
        // },
        // {
        //     title: "Programacion Frontend",
        //     description: "Programacion frontend con React",
        //     teacher: "Juan Pirchoto"
        // }]);

                //Crear estudiantes:

        // await studentsModel.create({
        //     first_name: "Max",
        //     last_name: "Menvielle",
        //     email: "mm@gmail.com",
        //     gender: "M"
        // })

                //Asociacion del curso con el estudiante:
        //Primero deberemos tener acceso al estudiante: Lo buscamos por ID o por email
        //  const student = await studentsModel.findOne({_id: "653e93f77abeef05f8e5d4cc"});
        //  console.log(student)

                //Una vez que le pusheo el curso, lo debere guardar en la base de datos.
        //  student.courses.push({courses: "653e9361092a645bc2303a9f"})  
        //  await studentsModel.updateOne({_id: "653e93f77abeef05f8e5d4cc"}, student);

                //Sin aplicar middlware
                //Aplico el population para ver con todos los detalles los datos del curso
                //El primer courses hace referencia a justamente la referencia declarada en students.model.js y el segundo courses hace referencia a la parte que quiero traer.
        // const students = await studentsModel.find().populate("courses.courses")
        // console.log(JSON.stringify(students, null, "\t"))

                    //Con middleware
        const students = await studentsModel.find()
        console.log(JSON.stringify(students, null, "\t"))
    } catch (error) {
        console.log(error)
    }
};


environment();