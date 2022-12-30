import { Producto } from '../../manejoDeArchivos/archivosMongo.js';

class CarritosDaoMongoDb extends Producto {

  constructor() {
    super("carritos",{
        productos:{type:[],require: true},
        timestamp:{type:String,require: true}
    });
  }

}

export default CarritosDaoMongoDb;