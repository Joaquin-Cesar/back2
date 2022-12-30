const socket = io()

const renderProducto  =  (producto)=>{
  
  //Creo el contenedor
  const contenedorHijo= document.createElement("div")  
  contenedorHijo.id ='contenedorProducto'
  
  //Creo el Titulo
  const titulo = document.createElement("h5")
        titulo.innerHTML = producto.nombre
        contenedorHijo.appendChild(titulo)
  
        //Creo la imagen
        const imagen = document.createElement("img")
         imagen.src= producto.imagen
         contenedorHijo.appendChild(imagen)
  
         //Creo el contenedor con el precio
        const div = document.createElement("div")
        const precio = document.createElement("p")
        precio.innerHTML =producto.precio
        div.appendChild(precio)
        contenedorHijo.appendChild(div)


  console.log(contenedorHijo)
  document.getElementById('contenedorProductos').appendChild(contenedorHijo);
    }


    
socket.on("new-coneccion", data =>{
    data.forEach(element => {
   renderProducto(element)
    });
})


socket.on("producto", data =>{
  
      renderProducto(data)
})




function addProduct (e){
const productoNuevo = {
nombre: document.getElementById("nombre").value,
precio:document.getElementById("precio").value,
imagen:document.getElementById("imagen").value
}
console.log("productoNuevo:",productoNuevo)
socket.emit("nuevo-producto", productoNuevo)
return false
}



function render(data) {
    const html = data.map((elem, index) => {
      return(`<div class="contenedorMensajes" >
      <strong class="email" >${elem.email}</strong> [${elem.time}] :
      <em class="texto" >${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
  }
  
  socket.on('messages', function(data) { render(data); });
  
  function addMessage(e) {
    const mensaje = {
        email: document.getElementById('email').value,
        text: document.getElementById('texto').value
    };
    if (mensaje.email) {
      socket.emit('new-message', mensaje);
    } else {
      alert('Por favor introducir email');
    }
    
    return false;
  }