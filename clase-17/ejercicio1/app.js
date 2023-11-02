import mongoose from "mongoose";
import ordersModel from "./models/orders.models.js";
const environment = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Gianfranco:Yoy1WBNnp6Mo0SgG@cluste55575gl.fuje07k.mongodb.net/clase17?retryWrites=true&w=majority"
    );
    console.log("BDD connected");

          //Primer paso: insertar datos de prueba.
    // const orders = [
    //   {
    //     name: "Pepperoni",
    //     size: "medium",
    //     price: 19,
    //     quantity: 10,
    //     date: "2021-03-13T08:14:30Z",
    //   },
    //   {
    //     name: "Pepperoni",
    //     size: "medium",
    //     price: 20,
    //     quantity: 20,
    //     date: "2021-03-13T09:13:24Z",
    //   },
    //   {
    //     name: "Pepperoni",
    //     size: "large",
    //     price: 21,
    //     quantity: 30,
    //     date: "2021-03-17T09:22:12Z",
    //   },
    //   {
    //     name: "Cheese",
    //     size: "small",
    //     price: 12,
    //     quantity: 15,
    //     date: "2021-03-13T11:21:39.736Z",
    //   },
    //   {
    //     name: "Cheese",
    //     size: "medium",
    //     price: 13,
    //     quantity: 50,
    //     date: "2022-01-12T21:23:13.331Z",
    //   },
    //   {
    //     name: "Cheese",
    //     size: "large",
    //     price: 14,
    //     quantity: 10,
    //     date: "2022-01-12T05:08:13Z",
    //   },
    //   {
    //     name: "Vegan",
    //     size: "small",
    //     price: 17,
    //     quantity: 10,
    //     date: "2021-01-13T05:08:13Z",
    //   },
    //   {
    //     name: "Vegan",
    //     size: "medium",
    //     price: 18,
    //     quantity: 10,
    //     date: "2021-01-13T05:10:13Z",
    //   },
    // ];

          // //Segundo paso: Isertarlos a la base de datos.
    // await ordersModel.insertMany(orders);

    // //Validamos que se hayan guardado satisfactoriamente:
    // const ordersResults = await ordersModel.find();
    // console.log(ordersResults);

          //Definimos nuestra agregacion. aggregations
    const orders = await ordersModel.aggregate([
      //Nuestra agregacion va a contener los stages de nuestro pipeline
      //Vamos a definir nuestro primer stage.
      //Primer paso que pide: Filtrar pizzas de tamaño mediano.
      {
          //para hacer un filtrado podemos utilizar el operador $match
          $match: {size: "medium"}
      },
      //El resultado del stage anterior es la data de la entrada siguiente etapa:
      //Segundo paso que pide es: Agrupar las pizzas por sabor para corroborar cuantos ejemplares se vendieron de dichos sabores.
      {
        //El id por el cual vamos a hacer la agrupacion, sera el atributo NAME, colocaremos $.
        //En totalQuantity (Variable inventada por nosotros) sumaremos todas las ventas por sabores.
        $group: {_id: "$name", totalQuantity: {$sum: "$quantity"}}
        //En resumen agrupamos por sabores y sumamos los subtotales de cada sabor.
      },
      //Tercero: que los resultados se entreguen de mayor a menor por cantidad de ventas.
      {
        //Vamos a definir un sort de acuerdo al atributo totalQuantity.
        $sort: {totalQuantity: -1}
      },
      //Vamos a agrupar nuestros documentos para tener todos los registros en un arreglo.
      //Para posteriormente cuando generemos el nnuevo documento estos resultados no se guarden por separado.
      {
        //Cuarto:desea que los resultados se almacenen en una nueva colección “reports” con el fin de poder consultar el reporte para análisis futuros.
        //Generamos un id quemado, random.
        //El atributo orders almacenará los elementos generados en el stage anterior.
        $group: { _id: 1, orders: {$push: "$$ROOT"}}
        //Este id es temporal, solo nos sirve para generar la agrupacion, luego tendre quedarle un id aleatorio automatico.
        //Con $$ROOT accedo a todas las propiedades de nuestro objeto. Es decir el _id y el totalQuantity
      },
      //Vamos a aplicar una proyeccion donde vamos a generar un nuevo documento con un nuevo ObjectId.
      {
        $project: {
          "_id": 0, //Con 0 especificamos que va a generar un objectId automatico.
          orders: "$orders"
        }
      },
      //Vamos a generar nuestra nueva coleccion llamada "reportes"
      {
        $merge: {
          into: "reports"
        }
      }

    ]);
    console.log(JSON.stringify(orders))
  
  } catch (error) {
    console.log(error);
  }
};

environment();
