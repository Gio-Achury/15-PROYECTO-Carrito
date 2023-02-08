// VARIABLES
// es recomendable tener nuestras variables arriba y funciones abajo.
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
// Para agregar en nuestro carrito los articulos seleccionados creamos esta variable
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // CUANDO AGREGAS UN CURSO PRESIONANDO "AGREGAR AL CARRITO"
    listaCursos.addEventListener('click', agregarCurso);

    // ELIMINA CURSOS DEL CARRITO
    carrito.addEventListener('click', eliminarCurso);

    // VACIAR EL CARRITO
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // RESETEAMOS EL CARRITO

        limpiarHTML();//ELIMINAMOS TODO EL HTML
    })

}

// FUNCIONES 
function agregarCurso(e) {
    e.preventDefault();//marcamos preventDefault para evitar que la pagina nos devuelva al inicio luego de agregar 

    if( e.target.classList.contains('agregar-carrito') ) {//IF NOS DA LA SEGURIDAD QUE EL USUARIO AGREGO AL CARRO
        //etarget nos muestra donde damos click y classList nos muestra las clases ACCEDEMOS AL DV DEL CONTENIDO CURSO
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// ELIMINA UN CURSO DEL CARRITO
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // ELIMINA DEL ARREGLO DE ARTICULOSCARRITO POR EL DATA-ID
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

        carritoHTML();// ITERAR SOBRE EL CARRITO Y MOSTRAR SU HTML
    }
}

// P2 LEER EL CONTENIDO DEL HTML AL QUE LE DIMOS CLICK Y EXTRAE LA INFORMACION DEL CURSO "VIDEO 2"
function leerDatosCurso(curso) {


    // P3 CREAR UN OBJETO CON EL CONTENIDO DE CURSO ACTUAL
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        // El id nos permite ubicar la pocision del curso.
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    // REVISA SI UN ELEMENTO YA EXISTE EN EL CARRITO
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe) {
        //ACTUALIZAMOS LA CANTIDAD      
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id ) {
                curso.cantidad ++;
                return curso;// RETORNA EL OBJETO ACTUALIZADO SIN DUPLICADOS
            } else {
                return curso;// RETORNA LOS OBJETOS QUE NO SON DUPLICADOS 
            }

        } ) ;
        articulosCarrito = [...cursos];
    } else {

        // AGREGA ELEMENTOS ALA ARREGLO DEL CARRITO
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);
    carritoHTML();
}

// MUESTRA EL CARRITO DE COMPRAS EN EL HTML
function carritoHTML() {

    // LIMPIAR EL HTML PARA NO TENER DUPLICADOS
    limpiarHTML();

    // RECORRE EL CARRITO Y GENERA EL HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> 
                 <img src = "${curso.imagen}" width = "100"> 
            </td>
            
            <td> ${titulo} </td>
            
            <td> ${precio} </td>

            <td> ${cantidad} </td>

            <td>
                 <a href = "#" class = "borrar-curso" data-id = "${curso.id}" > x </a>
            </td>
        `;
        //AGREGA EL HTML DEL CARRITO EN EL TBODY
        contenedorCarrito.appendChild( row );
    });

}

// ELIMINA LOS CURSOS DEL TBODY
// Para limpiar el HTML creamos esta funcion
function limpiarHTML() {
    //FORMA LENTA
    //contenedorCarrito.innerHTML = '';

    // FORMA RECOMENDADA
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

}

