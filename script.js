document.getElementById("loanForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const monto = parseFloat(document.getElementById("monto").value);
  const interes = parseFloat(document.getElementById("interes").value) / 100;
  const plazo = parseInt(document.getElementById("plazo").value);

  if (monto <= 0 || interes <= 0 || plazo <= 0) {
    alert("Por favor, introduce valores válidos.");
    return;
  }

  const pagoMensual = calcularPagoMensual(monto, interes, plazo);
  const totalPago = pagoMensual * plazo;
  const totalInteres = totalPago - monto;

  document.getElementById("pagoMensual").textContent = `$${pagoMensual.toFixed(2)}`;
  document.getElementById("totalPago").textContent = `$${totalPago.toFixed(2)}`;
  document.getElementById("totalInteres").textContent = `$${totalInteres.toFixed(2)}`;
  document.getElementById("resultado").classList.remove("oculto");

  generarTablaAmortizacion(monto, interes, plazo, pagoMensual);
});

function calcularPagoMensual(monto, interesAnual, plazoMeses) {
  const tasaMensual = interesAnual / 12;
  return monto * (tasaMensual / (1 - Math.pow(1 + tasaMensual, -plazoMeses)));
}

function generarTablaAmortizacion(monto, interesAnual, plazoMeses, pagoMensual) {
  const cuerpoTabla = document.getElementById("amortizacion");
  cuerpoTabla.innerHTML = "";

  let saldo = monto;
  const tasaMensual = interesAnual / 12;

  for (let i = 1; i <= plazoMeses; i++) {
    const interes = saldo * tasaMensual;
    const capital = pagoMensual - interes;
    saldo -= capital;

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${i}</td>
      <td>$${capital.toFixed(2)}</td>
      <td>$${interes.toFixed(2)}</td>
      <td>$${pagoMensual.toFixed(2)}</td>
      <td>$${saldo.toFixed(2)}</td>
    `;
    cuerpoTabla.appendChild(fila);
  }
}
