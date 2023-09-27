const http = require("http")

//voy a crear mi primer sv backend
const server = http.createServer((request, response) => {
    response.end("Mi primer hola mundo desde el backend update #4")
})

//Tenemos que levantar el servidor en algun puerto en especifico
server.listen(8080, ()=>{
    console.log("Listening on port 80080")
})