const fs = require("fs");
 class ManagerUsuarios {
  constructor(path) {
    //Recibe como parametro la rutaa o el archivo donde voy a estar almacenando mis usuarios (Path)
    this.path = path;
  }

  //Vamos a obtener los usuarios del archivo Usuarios.json
  getUsers = async () => {

    try{
            //Validamos si nuestro archivos se encuentra creado o no.
        //En este caso necesitaremos el metodo sincronico EXIST ya que no existe ni en callbacks ni en metodos asincronicos algo similar.

            if(fs.existsSync(this.path)){
                //En el caso que exista voy a leer su contenido. Caso contrario devuelvo array vacio. Asi vuelve a empezar de 0.
                //Leo el archivo y le digo la codificacion
                const data = await fs.promises.readFile(this.path, "utf-8")
                //obtengo los datos que vienen en formato string y los parseo.
                const users = JSON.parse(data)
                //retornamos arreglo de objetos.
                return users;
            }
            else{
                    return [];
            }
    }

    catch(error){
        console.log(error)}
  };

  createUser = async (usuario) =>{
    try{
        //Primero obtengo todos los datos que se encuentren en el archivo (usuarios) hasta el momento.
        //Aqui aplicamos la retulizacion de codigo:
        const users = await this.getUsers();
        //Ahora podremos crear nuestro nuevo usuario.
        if(users.length === 0){
          usuario.id = 1;
        }else{
          usuario.id = users[users.length -1].id +1
        }
        //insertamos el elemento o usuario
      users.push(usuario)

      //una vez que ya hemos terminado el procesamiento guardamos el arreglo dentro de nuestro archivo.
      await fs.promises.writeFile(this.path, JSON.stringify(users, null, "\t"))

      return usuario;
    }catch(error){
      console.log(error)
    }
  }
}

module.exports ={
  ManagerUsuarios
}