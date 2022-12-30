import * as admin from "firebase-admin"
//var admin = require("firebase-admin");
import configuraciones from "../../configuraciones.js";

admin.initializeApp({
  credential: admin.credential.cert(configuraciones.firebase)
});
const db = admin.firestore();
export class Producto {
 
 constructor(collections)
 
    {
      this.collection= db.collection(collections)


   }

save =  async (producto) =>{
     try{
       await this.collection.add({producto})
       
      }  

     
     catch{
        console.log("error")
     }

}

getById= async (id)=>{
  await this.collection.doc(id).get();
}

getall = async ()=>{
 
  const vista =  await this.collection.get()
  vista.forEach(element =>{
    console.log({ id: element.id, ...element.data() });
  })
}

deleteById= async (id)=>{
await this.collection.doc(id).delete()
}

deleteAll = async (desicion)=>{
    if(desicion==="si"){
      await this.collection.delete()
    }
}

async update(id, objeto) {
  await this.collection.doc(id).update({ objeto});
  }

}



