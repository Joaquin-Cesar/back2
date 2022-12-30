import express from "express";
 const aplicacion = express();
const PORT = process.env.PORT|| 8080
import { routeProducto } from "./routes/productos.js";
import { routeCarrito } from "./routes/carrito.js";


 
aplicacion.use(express.json());
 aplicacion.use(express.urlencoded({ extended: true }));

aplicacion.use("/api/productos",routeProducto)
aplicacion.use("/api/carrito",routeCarrito)

aplicacion.use((peticion,respuesta,next) =>{
if(!peticion.route){
  respuesta.status(401).send({ error : -2, descripcion: 'ruta ${peticion.url}  no encontrada'})
}
else{
next()
}
})

 const server =  aplicacion.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
 server.on("error", error => console.log(`Error en servidor ${error}`))

