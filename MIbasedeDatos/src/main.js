const express = require("express")
const fs = require('fs')
 const aplicacion = express();
 const moment = require('moment');
 const PORT = 8080
 const carpetaPublica ="./public"
 const Producto = require('./manejoDeArchivos/archivosSql.js')
 const options = require('./connection/options.js')
 

 const producto = new Producto(options.mysql, 'productos')
 const mensajes = new Producto(options.sqlite3, 'mensajes')

 const {Server: HttpServer} = require("http")
 const {Server: IOServer} = require("socket.io")

 const httpServer = new HttpServer(aplicacion)
 const io = new IOServer(httpServer)
 
const bodyParser = require("body-parser");
aplicacion.use(bodyParser.urlencoded({ extended: true, limit: "50mb"}));
aplicacion.use(bodyParser.json({ limit: "50mb"}));
 
aplicacion.use(express.static(carpetaPublica))


const knex = require('knex');

 const connectionMsql =  knex(options.mysql) 
 const connectionSlit3 = knex(options.sqlite3)  

 const arrayProductos =[
  {
    nombre: "Coca Cola Zero (500ml)",
    precio: 120,
    imagen: "https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_google-64.png"

  },
  {
    nombre: "Jamón-Bacon Sin Gluten",
    precio: 450,
    imagen: "https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_gmail-64.png"
 
  },
  {
    nombre: "Fanta (500ml)",
    precio: 115,
    imagen: "https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_sketch_app-64.png"
   
  }
]

const arrayMensajes =[
  {
    email: "juan@gmail.com",
    text: "¡Hola! ¿Que tal?"
    
  },
  {
    email: "pedro@gmail.com",
    text: "¡Muy bien! ¿Y vos?"
   
  }
]

const datos =async () => {
  try {
    const existsProductos = await connectionMsql.schema.hasTable('productos');
    const existsMensajes = await connectionMsql.schema.hasTable('mensajes');
   
    if (!existsProductos) {
     await connectionMsql.schema.createTable('productos', (table) => {
      table.increments('id').primary;
      table.string('nombre', 15).notNullable();
      table.string('imagen')//longblob NOT NULL
      table.float('precio');
    });
    await connectionMsql('productos').insert(arrayProductos);}

   //const productosTxt =  await fs.promises.readFile("producto.txt","utf-8")
   //console.log("productosTXT",productosTxt)
  

    const consulta = await connectionMsql('productos');
    console.table(consulta); 
    
    connectionMsql.destroy();

    
    if (!existsMensajes) {
      await connectionSlit3.schema.createTable('mensajes', (table) => {
      table.increments('id').primary;
      table.string('email', 15).notNullable();
      table.string('text',160).notNullable()//longblob NOT NULL
      table.float('time');
    });
    await connectionSlit3('mensajes').insert(arrayMensajes);
  }

    //let mensajesTxt =  await fs.promises.readFile("mensajes.txt","utf-8")
    //console.log("mensajes:,",mensajes)
    

    const consulta2 = await connectionSlit3('mensajes');
    console.table(consulta2);    
    connectionSlit3.destroy();



  } catch (error) {
    console.log(error);
  }

}

datos()


aplicacion.get('/', (peticion, respuesta) => {
  respuesta.send("index.html", {root:carpetaPublica
  });
})
 aplicacion.use(express.json());
 aplicacion.use(express.urlencoded({ extended: true }));

 
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
 server.on("error", error => console.log(`Error en servidor ${error}`))

io.on("connection", async (socket)=>{
  console.log(" Nuevo cliente conectado")

  const listadoProductos=  await producto.getAll()
 socket.emit("new-coneccion", listadoProductos)

 socket.on("nuevo-producto",(data)=>{
  producto.save(data)


  io.sockets.emit("producto", data)
 })



 const listaMensajes = await mensajes.getAll()
 socket.emit('messages', listaMensajes);

 //Evento para recibir nuevos mensajes
 socket.on('new-message', async data => {
  console.log("data",data)
   data.time = moment(new Date()).format('DD/MM/YYYY hh:mm:ss');
   await mensajes.save(data);
   const listaMensajes = await mensajes.getAll();
   io.sockets.emit('messages', listaMensajes);
 });
})

