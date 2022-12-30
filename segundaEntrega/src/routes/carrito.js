import express from "express";
//import { Producto } from "../manejoDeArchivos/archivos.js";
import ContenedorCarritos from "../daos/carritos/carritosMongoDb.js"
import ContenedorProductos from "../daos/productos/productosMongoDb.js"
const routeCarrito = express.Router()


 const carrito= new ContenedorCarritos()
 //const producto = new ContenedorProductos()

 
 routeCarrito.post('/', async(peticion, respuesta) => {
  const nuevoCarrito ={
    timestamp: Date.now(),
    productos : []
  }
  const id = await carrito.save(nuevoCarrito)
  respuesta.json(id)
})


routeCarrito.get('/', async(peticion, respuesta) => {
    const listaCarrito = await carrito.getall()
    respuesta.json(listaCarrito)
})

routeCarrito.delete('/:id', async(peticion, respuesta) => {
    const id = parseInt(peticion.params.id);
    await producto.deleteById(id)
    respuesta.json({
        status: id 
      });

}) 

routeCarrito.get('/:id/productos', async(peticion, respuesta) => {
    const id = parseInt(peticion.params.id);
    console.log("id",id)
  const productoPedido = await carrito.getById(id)
  console.log("productoPedido",productoPedido)
  if (productoPedido) {
    respuesta.json(productoPedido.productos);
  } else {
    respuesta.status(404);
    respuesta.json({ error : 'producto no encontrado' });}
})

routeCarrito.post('/:id/productos', async(peticion, respuesta) => {
    const id = parseInt(peticion.params.id) 
    const productoCarrito = peticion.body.productoCarrito
    console.log("IDproducto",productoCarrito)
    const product = await producto.getById(productoCarrito)
    const carritos = await carrito.getById(id)
    console.log("producto",product)
    console.log("carrito",carritos)
   carritos.productos.push(product)
   await carrito.update(id,carritos)
    respuesta.json({
        status: "okey" 
      });
})



routeCarrito.delete('/:id/productos/:id_prod', async(peticion, respuesta) => {
  const id = parseInt(peticion.params.id) 
const productoCarrito = parseInt(peticion.params.id_prod)
   const carritos = await carrito.getById(id)
   let indexDelete = -1
    carritos.productos.forEach((element, index) => {
        if(element.id == productoCarrito){
            indexDelete = index
            console.log("indexDelete",indexDelete)
        } 
        if(indexDelete => 0){
         
            carritos.productos.splice(indexDelete, 1)
        }
    });

   await carrito.update(id,carritos)
    respuesta.json({
        status: "okey" 
      });
}) 
 
export {routeCarrito}