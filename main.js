const formCalc = document.getElementById('formulario-calculadora')
const resultado = document.getElementById('resultado')

formCalc.addEventListener('submit', (evento) => {
    const nombre = document.getElementById("nombre");
    const tipoDoc = document.querySelector('#tipoDocumento')
    const numDoc = document.querySelector('#numDocumento')
    const edad = document.querySelector('#edad')
    const peso = document.querySelector('#peso')
    const altura = document.querySelector('#altura')
    const actividad = document.querySelector('#actividad')
    var genero = document.querySelector('input[name="genero"]:checked')
    evento.preventDefault();
    const isFormValid = formValidations({ edad, nombre, tipoDoc, peso, altura })
    if (isFormValid) {
        const { msg, grupoPoblacional } = calcularInfo({ genero, actividad, peso, altura, edad, nombre, tipoDoc, numDoc })
        aparecerResultado()
        resultado.innerHTML =
            `<div id='calculo' class='card-body d-flex flex-column justify-content-center aling-items-center'> 
                <h2>
                    ${msg}
                </h2>
                <h2 class='my-3 w-100'>
                    El grupo poblacional al cual perteneces es: <strong>${grupoPoblacional}</strong>
                </h2>
            </div>`
        formCalc.reset();
    } else {
        desvanecerResultado()
        mostrarMensajeDeError('Datos invalidos')
    }
})

function calcularInfo({ genero, actividad, peso, altura, edad, nombre, tipoDoc, numDoc }) {
    const numCal = genero.value === 'F' ? actividad.value * (10 * peso.value) + (6.25 * altura.value) - (5 * edad.value) - 161 : actividad.value * (10 * peso.value) + (6.25 * altura.value) - (5 * edad.value) + 5
    let msg = `El paciente ${nombre.value} identificado con ${tipoDoc.value} NO. ${numDoc.value}, requiere un total de ${Math.floor(numCal)} kcal para el sostenimiento de su TBM`
    let grupoPoblacional = ''
    if (edad.value <= 29) {
        grupoPoblacional = 'Joven'
    } else if (edad <= 59) {
        grupoPoblacional = 'Adultos'
    } else {
        grupoPoblacional = 'Adultos Mayores/Tercera Edad'
    }
    return { msg, grupoPoblacional }
    //Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5
    //Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161
}

function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}
function formValidations({ edad, nombre, tipoDoc, peso, altura }) {
    let isFormValid = true
    const errorNombre = document.getElementById("errorNombre");
    const errorTipoDoc = document.getElementById("errorTipoDoc");
    const errorPeso = document.getElementById("errorPeso");
    const errorAltura = document.getElementById("errorAltura");
    if (/\d/.test(nombre.value)) {
        nombre.classList.add("campo-invalido");
        errorNombre.style.display = "block";
        isFormValid = false;
    } else {
        nombre.classList.remove("campo-invalido");
        errorNombre.style.display = "none";
    }
    if ((tipoDoc.value === 'CC' && edad < 18) || (tipoDoc.value === 'TI' && edad >= 18)) {
        tipoDoc.classList.add("campo-invalido");
        errorTipoDoc.style.display = "block";
        isFormValid = false
    } else {
        tipoDoc.classList.remove("campo-invalido");
        errorTipoDoc.style.display = "none";
    }
    if (peso.value < 0) {
        peso.classList.add("campo-invalido");
        errorPeso.style.display = "block";
        isFormValid = false
    } else {
        peso.classList.remove("campo-invalido");
        errorPeso.style.display = "none";
    }
    if (altura.value < 0) {
        altura.classList.add("campo-invalido");
        errorAltura.style.display = "block";
        isFormValid = false
    } else {
        altura.classList.remove("campo-invalido");
        errorAltura.style.display = "none";
    }
    return isFormValid
}

// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';

    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}
