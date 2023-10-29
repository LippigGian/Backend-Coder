import mongoose from "mongoose";

const usersCollection = "users";

const usersChema = new mongoose.Schema({
    first_name :{
        type: String,
        index: true
    },
    last_name : String,
    email: String,
    gender: String

});
//indice compuesto:
//usersSchema.index({first_name: 1, lastname:1});

//Indice de texto:
//usersSchema.index({first_name: "text");

//Indice geoespacial:
//usersSchema.index({coordinates: "2d");

const usersModel = mongoose.model(usersCollection, usersChema);

export default usersModel;
