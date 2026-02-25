let inventario = [
  {
    nombre: "Teclado mecánico",
    categoria: "Periféricos",
    precio: 45000,
    stock: 8,
  },
  { nombre: "Mouse gamer", categoria: "Periféricos", precio: 25000, stock: 12 },
  {
    nombre: "Monitor 24 pulgadas",
    categoria: "Pantallas",
    precio: 120000,
    stock: 5,
  },
  {
    nombre: "Audífonos inalámbricos",
    categoria: "Audio",
    precio: 60000,
    stock: 7,
  },
  {
    nombre: "Disco SSD 1TB",
    categoria: "Almacenamiento",
    precio: 85000,
    stock: 10,
  },
];
let edicionActiva = null;
function agregarProducto() {
  let nombre = document.getElementById("nombre").value.trim();
  let categoria = document.getElementById("categoria").value.trim();
  let precio = parseFloat(document.getElementById("precio").value);
  let stock = parseInt(document.getElementById("stock").value);

  if (nombre === "" || categoria === "" || isNaN(precio) || isNaN(stock)) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }
  nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
  let producto = {
    nombre: nombre,
    categoria: categoria,
    precio: Math.round(precio),
    stock: stock,
  };
  if (edicionActiva !== null) {
    inventario[edicionActiva] = producto;
    edicionActiva = null;
  } else {
    inventario.push(producto);
  }
  limpiarFormulario();
  mostrarInventario();
}
function mostrarInventario() {
  let tabla = document.getElementById("tablaInventario");
  tabla.innerHTML = "";
  for (let i = 0; i < inventario.length; i++) {
    tabla.innerHTML += `
      <tr>
        <td>${inventario[i].nombre}</td>
        <td>${inventario[i].categoria}</td>
        <td>$${inventario[i].precio}</td>
        <td>${inventario[i].stock}</td>
        <td>
          <button class="btn btn-warning btn-sm mb-1"
                  onclick="editarProducto(${i})">
            Editar
          </button>
          <button class="btn btn-danger btn-sm"
                  onclick="eliminarProducto(${i})">
            Eliminar
          </button>
        </td>
      </tr>
    `;
  }

  calcularTotal();
  document.getElementById("tituloFormulario").textContent = "Agregar Producto";

  let boton = document.getElementById("btnGuardar");
  boton.textContent = "Agregar";
  boton.classList.remove("btn-warning");
  boton.classList.add("btn-primary");
}
function editarProducto(index) {
  let producto = inventario[index];

  document.getElementById("nombre").value = producto.nombre;
  document.getElementById("categoria").value = producto.categoria;
  document.getElementById("precio").value = producto.precio;
  document.getElementById("stock").value = producto.stock;

  edicionActiva = index;
  document.getElementById("tituloFormulario").textContent = "Editar Producto";

  let boton = document.getElementById("btnGuardar");
  boton.textContent = "Actualizar";
  boton.classList.remove("btn-primary");
  boton.classList.add("btn-warning");
}
function eliminarProducto(index) {
  inventario.splice(index, 1);
  mostrarInventario();
}
function calcularTotal() {
  let total = 0;
  for (let i = 0; i < inventario.length; i++) {
    total += inventario[i].precio * inventario[i].stock;
  }
  document.getElementById("valorTotal").textContent = `${total}`;
}
function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("stock").value = "";
}
document.addEventListener("DOMContentLoaded", function () {
  mostrarInventario();
});
