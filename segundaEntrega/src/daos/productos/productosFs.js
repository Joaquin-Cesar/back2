import { Producto } from '../../manejoDeArchivos/archivos.js';

class ProductosDaoFs extends Producto {

  constructor() {
    super('src/archivos/producto.txt');
  }

}

export default ProductosDaoFs;