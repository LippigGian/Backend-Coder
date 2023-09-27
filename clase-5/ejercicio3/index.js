import moment from "moment";


//Calcular edad:

const hoy = moment();
const fechaNacimiento = moment("1996-04-24", "YYYY-MM-DD")
//diff en un metodo propio de moment para calcular fechas.
//primer parametro la fecha a comparar, segundo parametro como va a estar expresada la respuesta.
const diferencia = hoy.diff(fechaNacimiento, "years")

console.log(diferencia)