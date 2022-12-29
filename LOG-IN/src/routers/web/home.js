import { Router } from 'express'
import  session  from 'express-session'
const productosWebRouter = new Router()

//Interceptar con middleware o con if, para restringir home si no hay sesion
productosWebRouter.get('/home', (req, res) => {
    //Cambiar el nombre de usuario
    const home= req.session.nombre
    console.log(home)
    if (!home) {
        return   res.redirect('/login')
    }
    res.render(process.cwd() + '/views/pages/home.ejs', { nombre: home})
})

productosWebRouter.get('/productos-vista-test', (req, res) => {
    res.sendFile(process.cwd() + '/views/productos-vista-test.html')
})

export default productosWebRouter