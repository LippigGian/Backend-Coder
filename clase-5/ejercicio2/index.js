/*utilizaremos el manejador de paquetes NPM para instalar dependencias externas


npm init -y para aceptar los valores por defectos del archivo package.json
*/

import UserManager from "./managers/userManager.js";


const manager = new UserManager('./files/Usuarios.json');

const env = async () => {
	const usuarios = await manager.getUsers();
	// console.log(usuarios);

	// const user = {
    // 	nombre: 'Lucas',
    // 	apellido: 'Paz',
    //     usuario: "Gianiao",
    // 	contrasena: '12345'
	// };

	// await manager.createUser(user);

	// const usuariosResultadoFinal = await manager.getUsers();
	// console.log(usuariosResultadoFinal);
    await manager.validateUser("Gianiao","12345")
}

env();

