// Base de datos local de productos
const DB_PRODUCTOS = [
    { id: 0, nombre: "Mouse Gamer Pro", precio: 45.00 },
    { id: 1, nombre: "Teclado Mecánico RGB", precio: 85.00 },
    { id: 2, nombre: "Audífonos Surround 7.1", precio: 60.00 }
];

let carrito = [];

// Función para añadir al carrito
function agregar(id) {
    const producto = DB_PRODUCTOS.find(p => p.id === id);
    carrito.push(producto);
    actualizarVistaCarrito();
}

// Función para eliminar del carrito
function eliminar(index) {
    carrito.splice(index, 1);
    actualizarVistaCarrito();
}

// Actualiza la interfaz del carrito y el total
function actualizarVistaCarrito() {
    const contenedor = document.getElementById('listaCarrito');
    const totalElemento = document.getElementById('txtTotal');

    contenedor.innerHTML = "";
    let totalSuma = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="text-gray-400 italic">No has agregado productos aún.</p>';
    } else {
        carrito.forEach((prod, index) => {
            totalSuma += prod.precio;
            contenedor.innerHTML += `
                <div class="flex justify-between items-center bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <div>
                        <span class="font-bold text-lg">${prod.nombre}</span>
                        <span class="ml-4 text-blue-600">$${prod.precio.toFixed(2)}</span>
                    </div>
                    <button onclick="eliminar(${index})" class="text-red-500 font-medium hover:underline">Quitar</button>
                </div>
            `;
        });
    }
    totalElemento.innerText = `$${totalSuma.toFixed(2)}`;
}

// Lógica del buscador en tiempo real
document.getElementById('inputBusqueda')?.addEventListener('keyup', (e) => {
    const busqueda = e.target.value.toLowerCase();
    const tarjetas = document.getElementsByClassName('card-item');

    Array.from(tarjetas).forEach(card => {
        const nombre = card.getAttribute('data-nombre');
        if (nombre.includes(busqueda)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});