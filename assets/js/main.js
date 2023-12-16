let botonResumen = document.getElementById("resumen");
let selectCategorias = document.getElementById("selectCategoria");
let totalPagar = document.getElementById("totalPagar")
let cantidad = document.getElementById("cantidad")
const form = document.querySelector(".validado");
const botonBorrar = document.querySelector("#botonBorrar");
const divsdescuentos = document.querySelectorAll(".precios-categorias");
const enviar = document.querySelector("#enviar");






const nuevoOrador = () => {

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const tema = document.getElementById('floatingTextarea2').value;

    const orador = {
        nombre,
        apellido,
        mail: "",
        tema
    }

    const opcionesRequest = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orador)
    };

    fetch('http://localhost:8080/web-app/api/orador', opcionesRequest)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta');
            }
            return response.json();
        })
        .then(data => {

            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Orador creado correctamente",
                showConfirmButton: false,
                timer: 1500
            });
             
           
          
           
            setTimeout(() => {
                location.reload(); // Recarga la página actual
            }, 1600)
    

        })
        .catch(error => {
            console.error('Hubo un problema al realizar el fetch:', error);
        });


     


}

enviar.addEventListener('click', nuevoOrador);

divsdescuentos.forEach(function (div) {

    div.addEventListener("click", function () {

        const tipoDescuento = div.getAttribute("data-attribute");
        console.log(tipoDescuento);
        selectCategorias.value = tipoDescuento;





    })





})


botonResumen.addEventListener("click", function () {
    if (form.checkValidity()) {
        procesarCategoria(selectCategorias.value, Number(cantidad.value))
    }

})
botonBorrar.addEventListener("click", function () {

    form.reset();
    form.classList.remove('was-validated')



});

form.addEventListener('submit', (e) => {

    e.preventDefault();

    if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();

    }

    form.classList.add('was-validated')

})



function procesarCategoria(categoria, cantidad) {

    let valor
    //obtiene valor del select
    switch (categoria) {

        case "estudiante":


            valor = calcularValorTicket(80, cantidad)
            break;
        case "trainee":

            valor = calcularValorTicket(50, cantidad)
            break
        case "junior":

            valor = calcularValorTicket(15, cantidad)
            break;
    }

    return valor

}


function calcularValorTicket(porcentaje, cantidad) {


    let res = ((200 - (200 * porcentaje) / 100)) * cantidad
    escribirEnInputTotal(res)



    return res


}

function escribirEnInputTotal(valor) {
    totalPagar.value = valor

}

