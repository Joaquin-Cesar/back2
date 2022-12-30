import { Producto } from '../../manejoDeArchivos/archivos.js';

class CarritosDaoFs extends Producto {

  constructor() {
    super('src/archivos/carrito.txt');
  }

}

export default CarritosDaoFs;