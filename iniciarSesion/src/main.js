import express from 'express'
import mongoose from 'mongoose'
import config from './config.js'
import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'
import authWebRouter from './routers/web/auth.js'
import homeWebRouter from './routers/web/home.js'
import productosApiRouter from './routers/api/productos.js'
import addProductosHandlers from './routers/ws/productos.js'
import addMensajesHandlers from './routers/ws/mensajes.js'


const conectarDB =(url,cb)=>{
    mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}, (error)=>{
        if(cb !=null){
            cb(error)
        }
    })
}

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

io.on('connection', async socket => {
        addProductosHandlers(socket, io.sockets)
    addMensajesHandlers(socket, io.sockets)
});



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('view engine', 'ejs');

app.use(productosApiRouter)
app.use(authWebRouter)
app.use(homeWebRouter)



conectarDB(config.mongoRemote.cnxStr,error =>{
    if(error) return console.log("Error al conectar Mongoo")

    console.log("DB conectada correctamente")
    const connectedServer = httpServer.listen(config.PORT, () => {
        console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
    })
    connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
    
})

