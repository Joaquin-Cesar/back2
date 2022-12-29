import { Router } from 'express'
import  session  from 'express-session'
import MongoStore from "connect-mongo"


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
     return   res.redirect('/login')
    }
    //Si la sesion no existe, redirigir a login, sino redirigir a home
    res.redirect('/home')
})

authWebRouter.get('/login', (req, res) => {
   //Si ya existe una sesion, redirigir al home
   res.sendFile(process.cwd() + '/views/login.html')
   const login = req.session.nombre
   console.log("hola:",login );
   if(login ){
    console.log("nombre login get:",login );
     res.redirect('/home')
    }
  
})

authWebRouter.post('/login', (req, res) => {
   
  //Guardar el nombre que viene en el body en la sesion.
  console.log("chau:",req.session.nombre);
  req.session.nombre = req.body.nombre
  console.log("nombre login post:",req.session.nombre);
  res.redirect('/home')
})


authWebRouter.get('/logout', (req, res) => {
    //Obtener el nombre del usuario
   const nombre = req.session.nombre 
   console.log("nombre para borrrar:",nombre)
    //Eliminar la sesion con destroy
    req.session.destroy((err) => {
        if (!err) {
          return   res.render(process.cwd() + '/views/pages/logout.ejs', { nombre: nombre })
          }
          return  res.status(500).json({
            error: 'Ha ocurrido un error durante el logout'
          });
       
      });
    //Renderizar la plantilla con el nombre de usuario
    
})





export default authWebRouter