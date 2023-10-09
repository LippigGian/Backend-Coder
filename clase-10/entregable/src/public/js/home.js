//Con este socket vamos a establecer la comunicacion con nuestro servidor (El handshake)
const socket = io();

//Escuchar html:
const formAdd = document.getElementById("addProductForm");
const formDelete = document.getElementById("deleteProductForm");
const listProducts = document.getElementById("listProducts");
const listProductsDelete = document.getElementById("productId");

// Listener submit del formulario agregar producto
formAdd.addEventListener("submit", function (e) {
  e.preventDefault();
  //Obtener el valor del textarea para add product
  const product = document.getElementById("productoAdd").value;
  socket.emit("addProduct", product);
  //Borrar contenido textArea:
  document.getElementById("productoAdd").value = " ";
});

//Listener submit del formulario eliminar producto por ID:
formDelete.addEventListener("submit", function (e) {
  e.preventDefault();
  //Obtener el valor del textarea para delete product
  const product = document.getElementById("productDelete").value;
  socket.emit("deleteProduct", product);
  //Borrar contenido textArea:
  document.getElementById("productDelete").value = " ";
});

socket.on("mostrartodo", (product) => {
  console.log("entro al socke.on DEL FRONTEND");
  console.log(product);
  listProducts.innerHTML = " ";
  product.forEach((prod) => {
    listProducts.innerHTML += `
        <ul style="list-style: none; border: 1px solid #ccc; padding: 10px; margin-top: 10px; background-color: #f8f8f8; border-radius: 5px;">
        <li>ID: ${prod.id}</li>
        <li>Title: ${prod.title}</li>
</ul>
    `;
  });
});
