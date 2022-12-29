import { Router } from 'express'
import  session  from 'express-session'
import MongoStore from "connect-mongo"
import path from 'path'

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };  
const authWebRouter = new Router()


authWebRouter.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://Joaquin:Joaquin@cluster0.ggzahbb.mongodb.net/sesiones?retryWrites=true&w=majority',
    mongoOptions: advancedOptions,
    ttl: 600
  }),
  secret: 'cualquier_cosa',
  resave: false,
  saveUninitialized: false
}));


authWebRouter.get('/', (req, res) => {
    const session = req.session.nombre
    console.log("nombre para inicial:",session)
    if (session == undefined) {
        res.redirect('/login')
    }
    //Si la sesion no existe, redirigir a login, sino redirigir a home
    res.redirect('/home')
})

authWebRouter.get('/login', (req, res) => {
    //Si ya existe una sesion, redirigir al home
 if(req.session.nombre){
 console.log("nombre login antes:",req.session.nombre)
 res.sendFile(process.cwd() + '/views/login.html')
    }
  
})

authWebRouter.get('/logout', (req, res) => {
    //Obtener el nombre del usuario
   const nombre = req.session.nombre 
   console.log("nombre para borrrar:",nombre)
    //Eliminar la sesion con destroy
    req.session.destroy((err) => {
        if (!err) {
             res.render(process.cwd() + '/views/pages/logout.ejs', { nombre: nombre })
          }
          res.status(500).json({
            error: 'Ha ocurrido un error durante el logout'
          });
       
      });
    //Renderizar la plantilla con el nombre de usuario
    
})


authWebRouter.post('/login', (req, res) => {
   
    //Guardar el nombre que viene en el body en la sesion.
    req.session.nombre = req.body
    console.log("nombre login2:",req.session.nombre);
    res.redirect('/home')
})



export default authWebRouter