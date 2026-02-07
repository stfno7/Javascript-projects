// dom
const display = document.getElementById("display");
const botones = document.querySelectorAll("button");
const botonBorrar = document.getElementById("borrar");
const botonIgual = document.getElementById("igual");

let currentInput = ""; // input seleccionado actual

// bucle para recorrer los botones
botones.forEach(button => {
  const value = button.dataset.value;

  if (value) {
    button.addEventListener("click", () => {
      currentInput += value;
      display.value = currentInput;
    });
  }
});

// Limpiar pantalla
botonBorrar.addEventListener("click", () => {
  currentInput = "";
  display.value = "";
});

// Calcular resultado con catch para manejar error
botonIgual.addEventListener("click", () => {
  try {
    const result = eval(currentInput);
    display.value = result;
    currentInput = result.toString();
  } catch (error) {
    display.value = "Error";
    currentInput = "";
  }
});


/** FUNCIONALIDADES TECLADO **/

document.addEventListener("keydown", (e) => {
  // Tecla Backspace: borrar último carácter
  if (e.key === "Backspace") {
    e.preventDefault();
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  }
    
  // Tecla Enter: calcular resultado (mismo que =)
  if (e.key === "Enter") {
    e.preventDefault();
    try {
      const result = eval(currentInput);
      display.value = result;
      currentInput = result.toString();
    } catch (error) {
      display.value = "Error";
      currentInput = "";
    }
  }
  
  // números y operadores teclado
  const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.'];
  if (allowedKeys.includes(e.key)) {
    e.preventDefault();
    currentInput += e.key;
    display.value = currentInput;
  }
});
