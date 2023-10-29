import { cartsModel } from "./models/carts.models.js";

export default class Carts {
    constructor(){
        console.log("Working carts with DB")
    }
    getAll = async () =>{
        const  carts = await cartsModel.find().lean();
        //Con el .lean() transformamos de formato BSON a POJO.
        return carts;
    }

    save = async (cart) =>{
        const result = await cartsModel.create(cart);
        return result;
    }
    // update = async(id, cart) => {
    //     const result = await cartsModel.updateOne({_id: id}, cart);
    //     return result;
    // }
}