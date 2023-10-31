
import {messagesModel } from "./models/messages.models.js"

export default class Message {
    constructor(){
        console.log("Working messages with DB")
    }
    getAll = async () =>{
        const  messages = await messagesModel.find().lean();
        //Con el .lean() transformamos de formato BSON a POJO.
        return messages;
    }

    save = async (message) =>{
        console.log("mensaje es: " + message)
        const result = await messagesModel.create(message);
        console.log(result)
        return result;
    }

}