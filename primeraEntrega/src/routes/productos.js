import express from "express";
import { Producto } from "../manejoDeArchivos/archivos.js";
const routeProducto = express.Router()


 const producto = new Producto('./src/archivos/producto.txt')


const privilegio = (peticion,respuesta,next) =>{
    const administrador= peticion.headers.administrador
    if (administrador === "true") {
        next()
    }
    else{
        respuesta.status(401).send({ error : -1, descripcion: 'ruta ${peticion.url}  no autorizada '})
    }
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
routeProducto.post('/',privilegio, async(peticion, respuesta) => {
    const productoNuevo = peticion.body;
               console.log(productoNuevo)
             await  producto.save(productoNuevo)
                respuesta.json(productoNuevo);
})
routeProducto.put('/:id',privilegio, async(peticion, respuesta) => {
    const cambio = peticion.body.cambio;
    console.log(cambio)
    const indice = parseInt(peticion.params.id) - 1;
    const array = await producto.getall()
    array[indice]= cambio
    producto.cambio(array)
    respuesta.json(array);
})
routeProducto.delete('/:id',privilegio, async(peticion, respuesta) => {
    const id = parseInt(peticion.params.id);
           await producto.deleteById(id)
            respuesta.json({
              status: id 
            });
})


 
export {routeProducto}