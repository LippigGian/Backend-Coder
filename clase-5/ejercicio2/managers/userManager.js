
import fs from "fs";
import crypto from "crypto"

export default class UserManager {
	constructor(path) {
    	this.path = path;
	}

	//vamos a obtener los usuarios del archivo Usuarios.json
	getUsers = async () => {
    	try {
        	if (fs.existsSync(this.path)) {
            	//en el caso que exista voy a leer su contenido
            	const data = await fs.promises.readFile(this.path, 'utf-8');
            	const users = JSON.parse(data);
            	return users;
        	} else {
            	return [];
        	}
    	} catch (error) {
        	console.log(error);
    	}
	}

createUser = async (usuario) => {
    	try {
        	//obtener TODOS los usuarios que tenga almacenado hasta el momento
        	//arreglo de objetos
        	const users = await this.getUsers();

        	if (users.length === 0) {
            	usuario.id = 1;
        	} else {
            	usuario.id = users[users.length - 1].id + 1;
        	}

        	//insertamos el elemento o usuario
            //Hasheando contrasena: 

            usuario.salt = crypto.randomBytes(128).toString("base64")
            usuario.contrasena = crypto.createHmac("sha256", usuario.salt).update(usuario.contrasena).digest("hex")
        	users.push(usuario);

        	//una vez que ya hemos terminado el procesamiento
        	await fs.promises.writeFile(this.path, JSON.stringify(users, null, '\t'));

        	return usuario;

    	} catch (error) {
        	console.log(error);
    	}
	}
    validateUser = async (username, password) =>{
        //primero validar que el usuario exista

        try {
            const users = await this.getUsers();
            const userIndex = users.findIndex(user => user.usuario === username)
            if(userIndex == -1){
                console.log("usuario no encontrado");
                return;
            }

            //en caso que exista, me paro sobre el objeto del usuario que me corresponde a partir del indice
            const user = users[userIndex];
            //Validaremos las claves pero nunca como texto plano.
            const newHash = crypto.createHmac("sha256", user.salt).update(password).digest("hex")
            if(newHash === user.contrasena){
                console.log("usuario logeado")
            }else{
                console.log("password incorrecta")
            }
        } catch (error) {
                console.log(error)
        }
    }
}
