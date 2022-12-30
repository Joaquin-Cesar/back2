import { Producto } from '../../manejoDeArchivos/archivosMongo.js';

class ProductosDaoMongoDb extends Producto {

  constructor() {
    super("productos",{
      nombre:{ type: String, require:true },
      precio:{ type: Number, require:true },
      imagen:{ type: String, require:true },
    });
  }

}

export default ProductosDaoMongoDb;