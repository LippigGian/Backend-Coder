/* ¿Cómo lo hacemos? Se creará una clase que permita gestionar usuarios usando fs.promises, éste deberá contar sólo con dos métodos: Crear un usuario y consultar los usuarios guardados.

El Manager debe vivir en una clase en un archivo externo llamado ManagerUsuarios.js
El método “Crear usuario” debe recibir un objeto con los campos:
Nombre
Apellido
Edad
Curso
El método debe guardar un usuario en un archivo “Usuarios.json”, deben guardarlos dentro de un arreglo, ya que se trabajarán con múltiples usuarios

El método “ConsultarUsuarios” debe poder leer un archivo Usuarios.json y devolver el arreglo correspondiente a esos usuarios
*/


const {ManagerUsuarios} = require("./ejercicio/managers/ManagerUsuarios");

// import ManagerUsuarios from "./ejercicio/managers/ManagerUsuarios";

// const ManagerUsuarios = require("./ejercicio/managers/ManagerUsuarios")

const manager = new ManagerUsuarios("./ejercicio/files/Usuarios.json")

const env = async ()=>{
    const usuarios = await manager.getUsers();
    console.log(usuarios)

    const user = {
        nombre: "Gian",
        apellido: "Lippi",
        edad: 22,
        curso: "Backend"
    };
    await manager.createUser(user)
    const usuariosResultadoFinal = await manager.getUsers();
    console.log(usuariosResultadoFinal)
}

env();