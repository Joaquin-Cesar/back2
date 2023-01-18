import { fork } from 'child_process'
import path from 'path'

function calcular(cant) {
  console.log("cant2",cant)
    return new Promise((resolve, reject) => {
        
      
        //hacemos fork del script
        const hijo = fork('../../scripts/calcularRandoms.js');
        //Enviamos un parametro conteniendo la cantidad una vez el script este listo
        process.on("message", () =>{
          process.send(cant)
        })
        //escuchamos el script y al terminar mandamos el mensaje por medio de resolve(mensaje)
        hijo.on('message', param => {
            if (param == 'listo') {
              hijo.send('start');
            } else {
              resolve.json({
                suma: param
              });
            }
          });
    })
}

export { calcular }