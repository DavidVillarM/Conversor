let deseo = 'venta';

function cambiarModo(nuevoModo) {
    deseo = nuevoModo;
    actualizarTabla(deseo);

    const vendoBoton = document.getElementById("vendoBoton");
    const quieroBoton = document.getElementById("quieroBoton");
    
    if (deseo === 'venta') {
        vendoBoton.classList.add('seleccion');
        quieroBoton.classList.remove('seleccion');
    } else {
        quieroBoton.classList.add('seleccion');
        vendoBoton.classList.remove('seleccion');
    }
}

function actualizarTabla(deseo) {
    const monedaElegida = document.getElementById("moneda");
    const ponerMonto = document.getElementById("monto");
    const tablaConversion = document.getElementById("tablaConversion");

    const divisaElegida = monedaElegida.value;
    const monto = parseFloat(ponerMonto.value);

    let monedas = ["PYG", "USD", "EUR", "BRL", "ARS", "JPY", "MXN"];

    let tablaHTML = "<tr><th>Moneda</th><th>Monto</th></tr>";
    for (let moneda of monedas) {
        if (moneda === divisaElegida) {
            continue;
        }
        
        if (deseo === 'venta'){
            const tasa = getCotizacion(divisaElegida, moneda);
            let montoCambiado =  monto * tasa;
            tablaHTML += `<tr><td>${moneda}</td><td>${montoCambiado.toFixed(2)}</td></tr>`;
        } else if (deseo === 'compra'){
            const tasa = getCotizacion(moneda, divisaElegida);
            let montoCambiado = monto / tasa ;
            tablaHTML += `<tr><td>${moneda}</td><td>${montoCambiado.toFixed(2)}</td></tr>`;
        }
    }

    tablaConversion.innerHTML = tablaHTML;
}

// Simulación de tasas de cambio fijas (Reemplazar con una API Real)
function getCotizacion(deMoneda, aMoneda) {
    const tasas = {
        PYG: { USD: 0.0001381, EUR: 0.000128205128, BRL: 0.000706, ARS: 0.1, JPY: 0.025, MXN: 0.0011 },
        USD: { PYG: 7280, EUR: 0.93, BRL: 5.05, ARS: 730, JPY: 175, MXN: 24 },
        EUR: { PYG: 8100, USD: 1.11, BRL: 5.63, ARS: 813.95, JPY: 195, MXN: 26.76 },
        BRL: { PYG: 1465, USD: 0.201, EUR: 0.187, ARS: 145.272, JPY: 33.199, MXN: 5.03 },
        ARS: { PYG: 10.6, USD: 0.001369, EUR: 0.001308, BRL: 0.007235, JPY: 1.09, MXN: 0.064 },
        JPY: { PYG: 60, USD: 0.0091, EUR: 0.0078, BRL: 0.0488, ARS: 0.91, MXN: 0.059 },
        MXN: { PYG: 906.27, USD: 0.16, EUR: 0.13, BRL: 0.83, ARS: 15.63, JPY: 16.90 }
    };

    return tasas[deMoneda][aMoneda];
}

const cotizacionUSDtoPYG = getCotizacion('USD', 'PYG');
const cotizacionPYGtoUSD = getCotizacion('PYG', 'USD');
console.log('Venta: ' + cotizacionUSDtoPYG); // Valor de compra en PYG
console.log('Compra: ' + cotizacionPYGtoUSD);