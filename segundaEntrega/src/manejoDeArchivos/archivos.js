import * as fs from "fs"


export class Producto {
 constructor(archivo)
    {
  this.archivo= archivo


   }

save =  async (producto) =>{
     try{

      if (fs.existsSync(this.archivo)) {

        let archivo =  await fs.promises.readFile(this.archivo,"utf-8")
        let productosExistentes =  JSON.parse(archivo)

        if (productosExistentes.length>0) {
            let identificador = productosExistentes[productosExistentes.length-1].id +1
            let product ={
                
                ...producto,
                id:identificador
            }
            productosExistentes.push(product)
            await fs.promises.writeFile(this.archivo,JSON.stringify(productosExistentes,null,2))
            return identificador
        }

        else{
            let identificador = 1 
            let product ={
              
                ...producto,  
                id:identificador
            }
            productosExistentes.push(product)
            await fs.promises.writeFile(this.archivo,JSON.stringify(productosExistentes,null,2))
            return identificador
        }


      }

      else{
        let product ={
            id:1,
            ...producto
        }
        await fs.promises.writeFile(this.archivo,JSON.stringify([product],null,2))
        return 1;
      }  

     }
     catch{
        console.log("error")
     }

}

getById= async (id)=>{
    let archivo =  await fs.promises.readFile(this.archivo,"utf-8")
    let productosExistentes =  JSON.parse(archivo)
    let MiProducto = productosExistentes.find((el)=> el.id ===id)
    return MiProducto
}

getall = async ()=>{
    let archivo =  await fs.promises.readFile(this.archivo,"utf-8")

const productosExistentes =  JSON.parse(archivo)
    return productosExistentes
}

deleteById= async (id)=>{
    let archivo =  await fs.promises.readFile(this.archivo,"utf-8")
    let productosExistentes =  JSON.parse(archivo)
    let borrador = productosExistentes.map(el => el.id)
    let productoEliminar = borrador.indexOf(id)
  
    productosExistentes.splice(productoEliminar,1)

    await fs.promises.writeFile(this.archivo,JSON.stringify(productosExistentes,null,2))
}

deleteAll = async (desicion)=>{
    if(desicion==="si"){
        let archivo =  await fs.promises.readFile(this.archivo,"utf-8")
        let productosExistentes =  JSON.parse(archivo)
         productosExistentes =[]
        await fs.promises.writeFile(this.archivo,JSON.stringify(productosExistentes,null,2))
    }
}

async update(id, objeto) {
    const archivo = await fs.promises.readFile(this.archivo, 'utf-8');
    const archivoParseado = JSON.parse(archivo);
    let posicion = -1;
    archivoParseado.forEach((producto, indice) => {
      if (producto.id == id) {
        posicion = indice;
      }
    });
    objeto.id = id;
    if (posicion => 0) {
      archivoParseado[posicion] = objeto;
      await fs.promises.writeFile(this.archivo, JSON.stringify(archivoParseado, null, 2));
      return objeto.id;
    }
  }

}



