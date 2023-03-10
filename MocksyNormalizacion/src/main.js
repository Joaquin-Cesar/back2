import  express  from "express";
const aplicacion = express()
import moment from "moment";

 const PORT = 8080
 const carpetaPublica ="./public"

 import options from "./connection/options.js";
 import ContenedorMemoria from "./manejoDeArchivos/archivosMemorias.js";
import faker from "faker";
 faker.locale ="es"
import { normalize, schema } from "normalizr";

 const producto = new ContenedorMemoria()
 const mensajes = new ContenedorMemoria()

 import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'


 const httpServer = new HttpServer(aplicacion)
 const io = new Socket(httpServer)

 import bodyParser from "body-parser";

aplicacion.use(bodyParser.urlencoded({ extended: true, limit: "50mb"}));
aplicacion.use(bodyParser.json({ limit: "50mb"}));
 
aplicacion.use(express.static(carpetaPublica))

import knex from "knex";


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

aplicacion.get('/api/productos-test', (req, res) => {
  const productosAleatorios = [];
  for (let index = 0; index < 5; index++) {
      productosAleatorios.push({
          id: index + 1,
          autor: faker.commerce.product(),
          texto: faker.commerce.price(),
          fyh: faker.image.imageUrl()
      });
  }
  res.json(productosAleatorios);
});

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

  const listadoProductos=  await producto. listarAll()
 socket.emit("new-coneccion", listadoProductos)

 socket.on("nuevo-producto",(data)=>{
  producto.guardar(data)


  io.sockets.emit("producto", data)
 })



 const listaMensajes = mensajeNormalizado()
 socket.emit('messages', listaMensajes);

 //Evento para recibir nuevos mensajes
 socket.on('new-message', async data => {
  console.log("data",data)
   data.time = moment(new Date()).format('DD/MM/YYYY hh:mm:ss');
   await mensajes.guardar(data);
   const listaMensajes = mensajeNormalizado()
   io.sockets.emit('messages', listaMensajes);
 });
})


const autorSchema = new schema.Entity("autor",{},{idAttribute: "email"})
const mensajeSchema = new schema.Entity("mensaje",{
  autor:autorSchema
})

const mensajesSchema = new schema.Entity("mensajes",{
  mensajes: mensajeSchema
})

async function mensajeNormalizado(){
  const arregloMensaje = await producto.listarAll()
  return normalize(arrayMensajes,mensajesSchema)
}