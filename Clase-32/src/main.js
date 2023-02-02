import express from 'express'
import session from 'express-session';
import passport from 'passport'

import config from './config.js'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import authWebRouter from './routers/web/auth.js'
import homeWebRouter from './routers/web/home.js'
import productosApiRouter from './routers/api/productos.js'
import randomsApiRouter from './routers/api/randoms.js'

import addProductosHandlers from './routers/ws/productos.js'
import addMensajesHandlers from './routers/ws/mensajes.js'
import log4js from "log4js"

log4js.configure({
  appenders: {
    miLoggerConsole: { type: "console" },
    miLoggerFile: { type: 'file', filename: './scr/routers/web/warn.log' },
    miLoggerFile2: { type: 'file', filename: './scr/routers/web/error.log' }
  },
  categories: {
      default: { appenders: ["miLoggerFile2"], level: "error" },
      consola: { appenders: ["miLoggerConsole",], level: "info" },
    archivo1: { appenders: ["miLoggerConsole","miLoggerFile"], level: "warn" },
    archivo2: { appenders: ["miLoggerConsole","miLoggerFile2"], level: "error" }
  
  }
 })

 
 const logger = log4js.getLogger();
//--------------------------------------------
// instancio servidor, socket y api

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    // console.log('Nuevo cliente conectado!');
    addProductosHandlers(socket, io.sockets)
    addMensajesHandlers(socket, io.sockets)
});

//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('view engine', 'ejs');

app.use(session(config.session))

app.use(passport.initialize());
app.use(passport.session());

//--------------------------------------------
// rutas del servidor API REST

app.use(productosApiRouter)
app.use(randomsApiRouter)

//--------------------------------------------
// rutas del servidor web

app.use(authWebRouter)
app.use(homeWebRouter)

//--------------------------------------------
// inicio el servidor

const connectedServer = httpServer.listen(config.PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
    logger.info(`Servidor escuchando en ${connectedServer.address().port}, PID: ${process.pid}`)
})
connectedServer.on('error', error => {
    console.log(`Error en servidor ${error}`)
    logger.error("Error en el servidor:", error)})
    export default logger