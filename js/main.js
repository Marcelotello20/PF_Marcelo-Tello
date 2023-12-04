//Formulario Index //

// Clase para construir los datos cuando se ingresen
class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad; 
    }
}

let saludoIntro = "¡Hola! Es un gusto";
let mayorDeEdad = "Eres mayor de edad y puedes disfrutar del contenido completo de nuestro sitio.";
let menorDeEdad = "Al ser menor te recomendamos que para comprar tengas el consentimiento de tus padres o un adulto a cargo de ti.";
let datoNoIntroducido = "Completar datos solicitados por favor.";

function ingresarDatos() {
    // Obtener el valor del input
    let nombre = document.getElementById("nombre").value;
    let edad = document.getElementById("edad").value;

    // Verificar si se introdujeron datos
    if (nombre === "" || edad === "") {
        document.getElementById("resultado").innerText = "Hola " + datoNoIntroducido;
    } else {
        // Crear un individuo de la clase Persona
        let persona = new Persona(nombre, parseInt(edad, 10));

        // Modificar el DOM para mostrar el saludo
        if (persona.edad >= 18) {
            document.getElementById("resultado").innerText = saludoIntro + " " + persona.nombre + "! " + mayorDeEdad;
        } else {
            document.getElementById("resultado").innerText = saludoIntro + " " + persona.nombre + "! " + menorDeEdad;
        }

        // Guardar el objeto Persona en el localStorage
        localStorage.setItem("persona", JSON.stringify(persona));

        // Actualizar el encabezado con el nombre introducido
        document.getElementById("headerSaludo").innerHTML = `<h1>Bienvenido</h1><h2>${nombre}</h2>`;
    }
}

//Obtener los datos de la Persona desde el localStorage
const personaGuardada = localStorage.getItem("persona");
if (personaGuardada) {
    const persona = JSON.parse(personaGuardada);
    
}


// PRODUCTOS Y CARRITO //


const carrito = document.getElementById('carrito')
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

//PRODUCTOS
const elementos1 = document.getElementById('lista-1')
const elementos2 = document.getElementById('lista-2')
const elementos3 = document.getElementById('lista-3')
const elementos4 = document.getElementById('lista-4')

const productos = [
    {id: 1, tipo: "Produccion completa", nombre: 'Promo Apollo Full', precio: 155000, cantidad: 2},
    {id: 2, tipo: "Produccion completa", nombre: 'Promo Apollo', precio: 145000, cantidad: 4},
    {id: 3, tipo: "Produccion completa", nombre: 'Promo Akai', precio: 125000, cantidad: 2},
    {id: 4, tipo: "Beats", nombre: 'Beat a Pedido', precio: 80000, cantidad: 4},
    {id: 5, tipo: "Beats", nombre: 'Beat Catalogo', precio: 50000, cantidad: 0},
    {id: 6, tipo: "Beats", nombre: 'Beats Ofertas', precio: 30000, cantidad: 0},
    {id: 7, tipo: "Grabacion", nombre: 'Grabacion Apollo', precio: 70000, cantidad: 3},
    {id: 8, tipo: "Grabacion", nombre: 'Grabacion Apollo Maqueta', precio: 30000, cantidad: 1},
    {id: 9, tipo: "Grabacion", nombre: 'Grabacion Akai', precio: 60000, cantidad: 3},
    {id: 10, tipo: "Grabacion", nombre: 'Grabacion Akai Maqueta', precio: 20000, cantidad: 1},
    {id: 11, tipo: "Sonido", nombre: 'Mezcla Beat', precio: 50000, cantidad: 2},
    {id: 12, tipo: "Sonido", nombre: 'Mezcla de Voz', precio: 50000, cantidad: 2},
    {id: 13, tipo: "Sonido", nombre: 'Master', precio: 15000, cantidad: 2},
    {id: 14, tipo: "Sonido", nombre: 'Promo Mezcla + Master - Voz y Beat', precio: 65000, cantidad: 4},    
];



// Eventos

cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    elementos2.addEventListener('click', comprarElemento);
    elementos3.addEventListener('click', comprarElemento);
    elementos4.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito); 
}

//Agregando mediante Html y su boton al carrito los productos
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

//Carrito con sus productos a partir de leerDatosElemento
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
}


//Boton para eliminar productos del carrito
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

