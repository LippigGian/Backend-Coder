import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    products:{
        //Vamos a definir la referencia al a coleccion de cursos:
        type: [{
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
                 //Esto significa que le pasaremos el ID, es decir el ObjectId del curso, como se llama la referencia? En este caso es "products"
            }
        }],
        default: []
    }
});



//Middleware:
//Cada vez que yo haga un find, deberá pasar lo siguiente:
// cartsSchema.pre("find", function() {
//     this.populate("product.products");
// });

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);
