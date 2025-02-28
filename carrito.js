// document.addEventListener('DOMContentLoaded', function() {
  const formulario = document.querySelector('.formulario');
  const carritoContenido = document.getElementById('carrito-contenido');
  const carritoVacio = document.getElementById('carrito-vacio');
  const totalValor = document.getElementById('total-valor');
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Verifica si el carrito está vacío
  if (carrito.length === 0) {
    carritoVacio.style.display = 'block';
    carritoContenido.style.display = 'none';
  } else {
    carritoVacio.style.display = 'none';
    carritoContenido.style.display = 'block';

    let total = 0;

    carrito.forEach(producto => {
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('producto');

      const productoImagen = document.createElement('img');
      productoImagen.src = producto.imagen; // La imagen del producto
      productoImagen.alt = producto.nombre;

      const productoNombre = document.createElement('h3');
      productoNombre.innerText = producto.nombre;

      const productoCantidad = document.createElement('p');
      productoCantidad.innerText = `Cantidad: ${producto.cantidad}`;

      const productoPrecio = document.createElement('p');
      const precioProducto = producto.precio; // Precio del producto
      productoPrecio.innerText = `Precio: $${precioProducto * producto.cantidad}`;

      const botonEliminar = document.createElement('button');
      botonEliminar.classList.add('boton-eliminar');
      botonEliminar.innerText = 'Eliminar';
      botonEliminar.addEventListener('click', () => {
        eliminarDelCarrito(producto);
      });

      productoDiv.appendChild(productoImagen);
      productoDiv.appendChild(productoNombre);
      productoDiv.appendChild(productoCantidad);
      productoDiv.appendChild(productoPrecio);
      productoDiv.appendChild(botonEliminar);

      carritoContenido.appendChild(productoDiv);

      total += precioProducto * producto.cantidad;
    });

    totalValor.innerText = total;
  }

  // Función para eliminar productos del carrito
  function eliminarDelCarrito(productoAEliminar) {
    const carritoActualizado = carrito.filter(producto => producto !== productoAEliminar);
    localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
    location.reload(); // Recarga la página para actualizar el carrito
  }

  // Guardar el producto en el carrito
  if (formulario) {
    formulario.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nombreProducto = document.querySelector('h1').innerText.trim();
      const selectElem = formulario.querySelector('select');
      const tallaSeleccionada = selectElem.value;
      const cantidadInput = formulario.querySelector('input[type="number"]');
      const cantidad = parseInt(cantidadInput.value);

      if (tallaSeleccionada === "-- Seleccionar Talla --" || !cantidad || cantidad < 1) {
        alert("Por favor, selecciona una talla y una cantidad válida.");
        return;
      }

      // Definir la imagen y el precio
      const imagenProducto = "img/inteli7.png"; // Coloca la imagen del producto de manera dinámica
      const precioProducto = 500; // Este precio también puede ser dinámico

      // Crea el objeto producto con solo la información esencial
      const producto = {
        nombre: nombreProducto,
        talla: tallaSeleccionada,
        cantidad: cantidad,
        imagen: imagenProducto,
        precio: precioProducto
      };

      // Recupera el carrito desde LocalStorage o crea uno nuevo
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      carrito.push(producto);
      localStorage.setItem('carrito', JSON.stringify(carrito));

      alert(`${cantidad}x ${nombreProducto} (${tallaSeleccionada}) agregado al carrito.`);
    });
  }
});
