//La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
//Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
//products: Array que contendrá objetos que representen cada producto


router.post("/", (req,res)=>{
    //Recibimos del body un array de productos.
    
});


//La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.

router.get("/:cid");

/*La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
*/
router.post("/:cid/product/:pid", (req,res)=>{
//Primero obtengo todos los carritos
//Luego busco entre ese array de carritos el que tenga el cid
//tomo el arreglo de productos de ese carrito y hago un push de un objeto. 
//Ejemplo del objeto:
// {
//     id: /pid
// }

//Luego guardar en el archivo
//Cada producto debera tener un atributo quantity.


//Validacion adicional en el caso de que el producto ya este en el carrito, solo habrá que modificar su atributo quantity. Todo esto antes de hacer el push.
//Primero busco en el arreglo de productos de ese carrito si el producto que quiero agregar ya existe.
//Si existe deberia hacer un product.quantity++;
//Si no existe deberia hacer un product.quantity = 1;
//Nuevamente guardar en el archivo
});