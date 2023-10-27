import { productsModel } from "./models/products.models.js"

export default class Products {
    constructor(){
        console.log("Working products with DB")
    }
    getAll = async () =>{
        const  courses = await productsModel.find().lean();
        //Con el .lean() transformamos de formato BSON a POJO.
        return courses;
    }

    save = async (course) =>{
        const result = await productsModel.create(course);
        return result;
    }
    update = async(id, course) => {
        const result = await productsModel.updateOne({_id: id}, course);
        return result;
    }
}