import {studentsModel } from "../dbManagers/models/students.model.js"


export default class Students{
    constructor(){
        console.log("Working students with DB")
    }
    getAll = async () =>{
        const students = await studentsModel.find();
        //Internamente el formato de nuestro registro son formato BSON
        //BSON -> POJO (Plain Old Js Object)
        return students.map(student => student.toObject());
        //Con esto ultimo transformamos lo que recibimos en formato BSON a formato JSON 
    }
    
    save = async (student) => {
        const result = await studentsModel.create(student);
        return result;
        
    }
}