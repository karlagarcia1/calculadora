const pantalla = document.querySelector(".pantalla")
let operacionPendiente = '';
let numeroAnterior = '';
operadorActual = null;
let reiniciarPantalla = false;

function agregar(valor){
    if (reiniciarPantalla) {
        pantalla.value = '';
        reiniciarPantalla = false;
    }
    if(['+'].includes(valor) ){
        if(operadorActual !== null){
            calcular();
        }
        numeroAnterior = pantalla.value;
        operadorActual = valor;
        reiniciarPantalla = true;
    }else{
        pantalla.value += valor;
    }
}

function limpiar(){
    pantalla.value = '';
    operacionPendiente = '';
    numeroAnterior = '';
    operadorActual = null;
}

function calcular (){
    if(operadorActual === null || reiniciarPantalla)
        return;

    const numero1 = parseFloat(numeroAnterior);
    const numero2 = parseFloat(pantalla.value);

    if(isNaN(numero1) || isNaN(numero2)){
        pantalla.value = "error"
        setTimeout(limpiar, 1500);
        return;
    }

    let resultado;
    switch(operadorActual){
        case '+':
            resultado = numero1 + numero2;
            break;
    }

    resultado = Math.round(resultado * 100000000) / 100000000;

    pantalla.value = resultado;
    operadorActual = null;
    numeroAnterior = '';
    reiniciarPantalla = true;
}

//Manejo de eventos del teclado

document.addEventListener('keydown', (event) =>{
    event.preventDefault();
    const key = event.key;

    //Números y operadores
    if(/[0-9\+\-\*\/\.]/.test(key)){
        agregar(key);
    }

    //Tecla Enter para calcular
    else if(key === 'Enter'){
        calcular();
    }

    //Tecla Escape para limpiar
    else if (key === 'Escape'){
        limpiar();
    }

    //Tecla backspace para borrar el último carácter
    else if (key === 'Backspace'){
        display.value = display.value.slice(0, -1);
    }
})


