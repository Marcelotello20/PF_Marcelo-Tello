const carrito = document.getElementById('carrito')
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

//PRODUCTOS
const elementos1 = document.getElementById('lista-1')
const elementos2 = document.getElementById('lista-2')


cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    elementos2.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    // Cargar carrito desde localStorage
    document.addEventListener('DOMContentLoaded', () => {
        const carrito = obtenerCarritoLocalStorage();
        carrito.forEach(item => {
            insertarCarrito(item);
        });
    });
}

function comprarElemento(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoElemento);
}

//Carrito con sus elementos creados a partir de leerDatosElemento
function insertarCarrito(elemento) {

    const row = document.createElement('tr');
    row.innerHTML = `
       <td>
          <img src="${elemento.imagen}" width=100 >
       </td>
       <td>
          ${elemento.titulo}
       </td>
       <td>
          ${elemento.precio}
       </td>
       <td>
          <a href="#" class="borrar" data-id="${elemento.id}">X</a>
       </td>
    `;

    lista.appendChild(row);

    // Almacenar en localStorage
    guardarCarritoLocalStorage();
}


function guardarCarritoLocalStorage() {
    const carrito = obtenerCarritoLocalStorage();
    carrito.push(infoElemento);
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function obtenerCarritoLocalStorage() {
    return localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];
}



function eliminarElemento(e) {
    e.preventDefault();
    let elemento,
        elementoId;

    if (e.target.classList.contains('borrar')) {

        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoId = elemento.querySelector('a').getAttribute('data-id');

    }    
}

function vaciarCarrito() {
    while(lista.firstChild) {
        lista.removeChild(lista.firstChild)
    }
    return false;
}
