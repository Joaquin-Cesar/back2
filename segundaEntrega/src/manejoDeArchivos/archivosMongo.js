import mongoose from "mongoose";
import configuraciones from "../../configuraciones.js";

await mongoose.set('strictQuery', true);
await mongoose.connect(configuraciones.mongodb.url)
export class Producto {
 constructor(collection, esquema)
    {
  this.collection= mongoose.model(collection,esquema)
   }

save =  async (producto) =>{
 let usuarioSave = await this.collection.create(producto)
  usuarioSave.id = usuarioSave._id
}

getById= async (id)=>{
 
  const lecturaId = await this.collection.findOne({"_id":id});
  if(lecturaId){
    lecturaId.id= lecturaId._id
    return lecturaId
  }
  return null
}

getall = async ()=>{
  let lecturaAll = await this.collection.find({});
  lecturaAll =lecturaAll.map(element=>{
    element.id =element._id
    return element
  })
  return  lecturaAll
}

deleteById= async (id)=>{
await this.collection.deleteOne({"_id":id})
}

deleteAll = async (desicion)=>{
    if(desicion==="si"){
        
        await  this.collection.delete()
    }
}

async update(id, objeto) {

   await this.collection.updateOne({"_id":id},{
    $set: {...objeto}
   })
   
  }

}



