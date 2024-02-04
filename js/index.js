// Primera preentrega
// Autor: Daniel Flores Chairez

console.log("Calculadora de Fechas");

alert("Bienvenido a la calculadora de fechas, este programa te permite calcular el tiempo transcurrido entre 2 y hasta 10 fechas");

function obtenerFechasYCalcularDiferencia() {
    const cantidadFechas = parseInt(prompt("Introduce el número de fechas (entre 2 y 10):"), 10);

    if (isNaN(cantidadFechas) || cantidadFechas < 2 || cantidadFechas > 10) {
        alert("Número de fechas no válido. Debe ser un número entre 2 y 10.");
        return;
    }

    const fechas = [];
    for (let i = 0; i < cantidadFechas; i++) {
        const fecha = obtenerFechaDesdePrompt(i + 1); // Pasar i + 1 como argumento
        fechas.push(new Date(fecha));
    }

    for (let i = 1; i < fechas.length; i++) {
        const diferencia = restarFechas(fechas[i - 1], fechas[i]);
        alert(`Diferencia entre fecha ${i} y fecha ${i + 1}: ${Math.abs(diferencia.años)} años, ${Math.abs(diferencia.meses)} meses, ${Math.abs(diferencia.dias)} días.`);
    }
}

function obtenerFechaDesdePrompt(numeroFecha) {
    let inputFecha;
    let fechaValida = false;

    while (!fechaValida) {
        inputFecha = prompt(`Introduce la fecha ${numeroFecha} en formato DD/MM/AAAA:`);

        // Validar el formato de la fecha con una expresión regular
        const formatoFechaRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (formatoFechaRegex.test(inputFecha)) {
            // Si el formato es válido, intentar crear un objeto de fecha
            const partesFecha = inputFecha.split('/');
            const dia = parseInt(partesFecha[0], 10);
            const mes = parseInt(partesFecha[1], 10) - 1; // Restar 1 al mes ya que en JavaScript los meses van de 0 a 11
            const año = parseInt(partesFecha[2], 10);

            const fecha = new Date(año, mes, dia);

            // Verificar si la fecha es válida
            if (!isNaN(fecha) && fecha.getDate() === dia && fecha.getMonth() === mes && fecha.getFullYear() === año) {
                fechaValida = true;
                alert("Fecha válida: " + fecha.toLocaleDateString());
            } else {
                alert("Fecha inválida. Inténtalo de nuevo.");
            }
        } else {
            alert("Formato de fecha incorrecto. Inténtalo de nuevo.");
        }
    }

    return inputFecha;
}

function restarFechas(fechaAnterior, fechaPosterior) {
    const milisegundosPorDia = 24 * 60 * 60 * 1000;
    const diferenciaEnMilisegundos = fechaPosterior - fechaAnterior;

    const años = Math.floor(diferenciaEnMilisegundos / (milisegundosPorDia * 365));
    const meses = Math.floor((diferenciaEnMilisegundos % (milisegundosPorDia * 365)) / (milisegundosPorDia * 30));
    const dias = Math.floor((diferenciaEnMilisegundos % (milisegundosPorDia * 30)) / milisegundosPorDia);

    return { años, meses, dias };
}

// Llamada a la función para obtener fechas y calcular la diferencia
obtenerFechasYCalcularDiferencia();
