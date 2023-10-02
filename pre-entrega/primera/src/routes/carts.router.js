import CartManager from "../managers/cart.manager.js";
//Importo la clase y luego creo la instancia.

const cartManager = new CartManager("./carrito.json")

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
router.post("/:cid/product/:pid", async (req,res)=>{
//Primero obtengo todos los carritos.
//MEjor primero obtengo el carrito por id
const carts = await cartManager.getProducts();
//En este punto voy a tener un objeto similar a este:
    //Objeto para almacenar nuestro carrito
    // {
    //     id: 'HJABJHASD65761457',
    //     products: [
    //         {
    //             id: 1,
    //             quantity: 1
    //         },
    //         {
    //             id: 2,
    //             quantity: 1
    //         }
    //     ]
    // }
    
//Luego busco entre ese array de carritos el que tenga el cid


const cartById = carts.find(cart => cart.id == cid)
//En caso de encontrarlo sigo con la logica
//Caso contrario devuelvo un error 400 que no se encuentra en carrito
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
const indexProductCart = cartById.products.findIndex(product => product.id == pid);
if(indexProductCart !=-1)
{
    cartById.products[indexProductCart]= cartById.products[indexProductCart].quantity++
}else{
//pusheo el producto al carrito
cartById.products.push({id: 1})
}

//Nuevamente guardar en el archivo TODOS los carritos
await cartManager.save(carts)
});