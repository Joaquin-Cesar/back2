import { Router } from 'express'
import { calcular } from '../../api/randoms.js'

const randomsApiRouter = new Router()

randomsApiRouter.get('/api/randoms', async (req, res) => {
    //Obtener cantidad por query params
   const cantidad = req.query.cant
   console.log("cant3",cantidad)
    //llamar la funcion del api, mandar la cantidad y recibir el resultado
    const result =calcular(cantidad)
    // res.json(result)
    res.json(result)
})

export default randomsApiRouter