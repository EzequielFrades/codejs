let carrito = [];
let total = 0;

// Recuperar el carrito del localStorage al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        mostrarCarrito();
    }
});

function agregarAlCarrito(producto) {
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.nombre === producto);

    if (productoExistente) {
        productoExistente.cantidad++; // Si existe, aumentar la cantidad
    } else {
        // Si no existe, agregarlo al carrito
        switch (producto) {
            case 'Chocolate':
                carrito.push({ nombre: 'Chocolate', precio: 2.50, cantidad: 1 });
                break;
            case 'Chicle':
                carrito.push({ nombre: 'Chicle', precio: 1.50, cantidad: 1 });
                break;
            case 'Caramelo':
                carrito.push({ nombre: 'Caramelo', precio: 1.50, cantidad: 1 });
                break;
            case 'ChicleRojo':
                carrito.push({ nombre: 'Chicle Cherry', precio: 1.50, cantidad: 1 });
                break;
            case 'ChicleVerde':
                carrito.push({ nombre: 'Chicle Menta', precio: 1.50, cantidad: 1 });
                break;
            case 'ChicleNaranja':
                carrito.push({ nombre: 'Chicle Naranja', precio: 1.50, cantidad: 1 });
                break;
            case 'ChocolateBlanco':
                carrito.push({ nombre: 'Chocolate Blanco', precio: 1.50, cantidad: 1 });
                break;
            case 'ChocolateAlmendras':
                carrito.push({ nombre: 'Chocolate con Almendras', precio: 1.50, cantidad: 1 });
                break;
            case 'CocaCola':
                carrito.push({ nombre: 'Coca Cola', precio: 1.50, cantidad: 1 });
                break;
            case 'CocaCola1':
                carrito.push({ nombre: 'Coca Cola 1L', precio: 1.50, cantidad: 1 });
                break;
            case 'Sprite':
                carrito.push({ nombre: 'Sprite', precio: 1.50, cantidad: 1 });
                break;
            case 'Sprite1':
                carrito.push({ nombre: 'Sprite 1L', precio: 1.50, cantidad: 1 });
                break;
            case 'Fanta':
                carrito.push({ nombre: 'Fanta', precio: 1.50, cantidad: 1 });
                break;
            case 'Fanta1':
                carrito.push({ nombre: 'Fanta 1L', precio: 1.50, cantidad: 1 });
                break;
            case 'Pepsi':
                carrito.push({ nombre: 'Pepsi', precio: 1.50, cantidad: 1 });
                break;
            case 'Pepsi1':
                carrito.push({ nombre: 'Pepsi 1L', precio: 1.50, cantidad: 1 });
                break;
            default:
                console.log(`Producto desconocido: ${producto}`);
                return;
        }
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    calcularTotal();
    mostrarCarrito();

    // Mostrar la notificación SweetAlert
    Swal.fire({
        icon: 'success',
        title: 'Producto agregado al carrito',
        text: `${producto} se ha añadido correctamente al carrito.`,
        showConfirmButton: false,
        timer: 1500 // La notificación desaparecerá después de 1.5 segundos
    });
}

function mostrarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} x ${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}`;

        const btnRestar = crearBoton('-', () => restarProducto(item));
        const btnSumar = crearBoton('+', () => sumarProducto(item));
        const btnEliminar = crearBoton('Eliminar', () => eliminarProducto(item));

        li.appendChild(btnRestar);
        li.appendChild(btnSumar);
        li.appendChild(btnEliminar);

        listaCarrito.appendChild(li);
    });
}

function crearBoton(texto, funcion) {
    const btn = document.createElement('button');
    btn.textContent = texto;
    btn.addEventListener('click', funcion);
    return btn;
}

function sumarProducto(item) {
    item.cantidad++;
    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    calcularTotal();
}

function restarProducto(item) {
    if (item.cantidad > 1) {
        item.cantidad--;
    } else {
        // Eliminar el producto del carrito si la cantidad es 1
        const index = carrito.indexOf(item);
        if (index !== -1) {
            carrito.splice(index, 1);
        }
    }
    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    calcularTotal();
}

function eliminarProducto(item) {
    // Eliminar todos los productos del tipo específico del carrito
    const index = carrito.indexOf(item);
    if (index !== -1) {
        carrito.splice(index, 1);
    }
    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    calcularTotal();
}

function calcularTotal() {
    total = carrito.reduce((acumulador, item) => acumulador + item.precio * item.cantidad, 0);
    document.getElementById('total').textContent = total.toFixed(2);
}

function buscarProducto() {
    // Obtener el término de búsqueda ingresado por el usuario
    const termino = document.getElementById('buscador').value.toLowerCase();

    // Filtrar los productos que coincidan con el término de búsqueda
    const productosFiltrados = productos.filter(producto => {
        const nombre = producto.nombre.toLowerCase();
        return nombre.includes(termino);
    });

    // Mostrar los productos filtrados en la página
    mostrarProductos(productosFiltrados);
}

