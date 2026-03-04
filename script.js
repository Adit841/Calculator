const numbers = document.querySelectorAll(".number");
const equal = document.querySelector(".equals");
const operators = document.querySelectorAll(".operator");
const reset = document.querySelector(".reset");
const clear = document.querySelector(".clear");
const percent = document.querySelector(".percent");
const zero = document.querySelector(".zero");
const previousDisplay = document.querySelector(".previous");
const currentDisplay = document.querySelector(".current");

let operator;
let previous;

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    currentDisplay.textContent += button.textContent;
  });
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    operator = button.textContent;
    previous = currentDisplay.textContent;

    previousDisplay.textContent = previous + " " + operator;
    currentDisplay.textContent = "";
    if(currentDisplay.textContent === ""){
      return;
    }
  });
});

function calculate(){
  let current = currentDisplay.textContent;

  let a = parseFloat(previous);
  let b = parseFloat(current);

  let result;

  if(operator === "+"){
    result = a + b;
  }

  if(operator === "-"){
    result = a - b;
  }

  if(operator === "X" ){
    result = a * b;
  }

  if(operator === "/" ){
    result = a / b;
  }

  currentDisplay.textContent = result;
  previousDisplay.textContent = "";
}
equal.addEventListener('click', calculate);
