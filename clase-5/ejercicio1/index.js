//generar 10.000 numeros aleatorios con los rangos del 1 al 20.
//Podria utilizar un bucle FOR.
//random le voy a decir que quiero un numero del 1 al 20.



let objetoResultado = {

};

for(let i=0; i<10000; i++){
    //funcion math para crear numeros aleatorios hasta el numero 20, incluye decimales. 
    //Por eso agrego math.round para rendondear y crear solo enteros

    const randomNuber = Math.round(Math.random()*20);

    //debo validar si en mi objeto existe la clave que acabo de generar.
    //la clave que acabo de generar es el numero randomico
    if(objetoResultado[randomNuber])
    {
        objetoResultado[randomNuber] += 1;
    }else{
        objetoResultado[randomNuber]=1
    }
};


console.table(objetoResultado)