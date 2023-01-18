import { Router } from 'express'
import { webAuth } from '../../auth/index.js'

import path from 'path'

const productosWebRouter = new Router()

productosWebRouter.get('/', (req, res) => {
    res.redirect('/home')
})

productosWebRouter.get('/home', webAuth, (req, res) => {
    res.render(path.join(process.cwd(), '/views/pages/home.ejs'), {
        nombre: req.user.displayName,
        foto: req.user.photos[0].value,
        email: req.user.emails[0].value,
        contador: req.user.contador
    })
})

productosWebRouter.get('/productos-vista-test', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/productos-vista-test.html'))
})

const memory = ()=>{
    const memoria =[]
for (const [key,value] of Object.entries(process.memoryUsage())){
    const my=`Memory usage by ${key}, ${value/1000000}MB `
    memoria.push(my)
}
return memoria
}

const args = process.argv.slice(2);

productosWebRouter.get('/info', (req, res) => {
    //To Do calcular datos y mandar a la plantilla
    res.render(path.join(process.cwd(), '/views/pages/info.ejs'), {specs: [{
        
        argumentos: args,
        sistemaOperativo: process.platform,
        versionNode:  process.version,
        memoria:memory(),
        iddelProceso: process.pid,
        carpeta:  process.execPath
     
    }]})
})

export default productosWebRouter