
//Con este socket vamos a establecer la comunicacion con nuestro servidor (El handshake)
const socket = io();

//Enviar mensaje desde el cliente
//Emitimos un evento, en este caso un mensaje
socket.emit("message", "Hola es un mensaje desde el cliente");


//Leer el evento mensaje del servidor

socket.on("evento_socket_individual", data =>{    
    console.log(data);
});
socket.on("evento_todos_menos_actual", data => {
    console.log(data);
});
socket.on("evento_todos", data => {
    console.log(data);
});





