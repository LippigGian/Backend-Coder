//Deberia implementar el router de productos en la ruta  /api/products

app.use("/api/products", routerProducts);

//Para el carrito, el cual tendrá su router en /api/carts/, configurar dos rutas:

app.use("/api/carts", routerCarts);

