import express from "express";
import { Producto } from "../manejoDeArchivos/archivosFs.js"
//import ContenedorProductos from "../daos/productos/productosMongoDb.js"
//import ContenedorProductos from "../daos/productos/productosM.js"
const routeProducto = express.Router()


 const producto = new  Producto("producto")


const privilegio = (peticion,respuesta,next) =>{
    //const administrador= peticion.headers.administrador
    //if (administrador === "true") {
        next()
    //}
    //else{
      //  respuesta.status(401).send({ error : -1, descripcion: 'ruta ${peticion.url}  no autorizada '})
    //}
}



 routeProducto.get('/', async (peticion, respuesta) => {
  const listaProductos = await producto.getall()
  respuesta.json(listaProductos)
})

 routeProducto.get('/:id', async(peticion, respuesta) => {
    const id = parseInt(peticion.params.id);
    console.log("id",id)
  const productoPedido = await producto.getById(id)
  console.log("productoPedido",productoPedido)
  if (productoPedido) {
    respuesta.json(productoPedido);
  } else {
    respuesta.status(404);
    respuesta.json({ error : 'producto no encontrado' });}
})
routeProducto.post('/', async(peticion, respuesta) => {
    const productoNuevo = peticion.body;
               console.log(productoNuevo)
             await  producto.save(productoNuevo)
                respuesta.json(productoNuevo);
})
routeProducto.put('/:id', async(peticion, respuesta) => {
  const indice = parseInt(peticion.params.id)  
  const cambio = peticion.body;
    cambio._id= indice
  await producto.update(indice,cambio)
    respuesta.json("ok");
})
routeProducto.delete('/:id', async(peticion, respuesta) => {
    const id = parseInt(peticion.params.id);
           await producto.deleteById(id)
            respuesta.json({
              status: id 
            });
})


 
export {routeProducto}