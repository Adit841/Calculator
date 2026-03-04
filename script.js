const numbers = document.querySelectorAll(".number");
const equal = document.querySelector(".equals");
const operators = document.querySelectorAll(".operator");
const reset = document.querySelector(".reset");
const clear = document.querySelector(".clear");
const percent = document.querySelector(".percent");
const zero = document.querySelector(".zero");
const previousDisplay = document.querySelector(".previous");
const currentDisplay = document.querySelector(".current");
const themeToggle = document.querySelector('.themeToggle');

const clickSound = new Audio("click.mp3");
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

let operator;
let previous;

function playSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    playSound();
    if (
      button.textContent === "." &&
      currentDisplay.textContent.includes(".")
    ) {
      return;
    }
    currentDisplay.textContent += button.textContent;
  });
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentDisplay.textContent === "" || previous === "") {
      return;
    }
    operator = button.textContent;
    previous = currentDisplay.textContent;

    previousDisplay.textContent = previous + " " + operator;
    currentDisplay.textContent = "";
  });
});


function calculate() {
  let current = currentDisplay.textContent;

  let a = parseFloat(previous);
  let b = parseFloat(current);

  let result;

  if (operator === "+") {
    result = a + b;
  }

  if (operator === "-") {
    result = a - b;
  }

  if (operator === "*") {
    result = a * b;
  }

  if (operator === "/") {
    if(b === 0) {
      currentDisplay.textContent = "Error";
      return;
    }
    result = a / b;
  }

  currentDisplay.textContent = result;
  previousDisplay.textContent = "";
}
equal.addEventListener("click", calculate);

reset.addEventListener("click", () => {
  previous = "";
  operator = "";

  previousDisplay.textContent = "";
  currentDisplay.textContent = "";
});

clear.addEventListener("click", () => {
  currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
});

percent.addEventListener("click", () => {
  let current = parseFloat(currentDisplay.textContent);

  if (!isNaN(current)) {
    currentDisplay.textContent = current / 100;
  }
});

document.addEventListener('keydown', (e) => {
  
  let key = e.key;
  
  if(!isNaN(key) ){
    currentDisplay.textContent +=key;
  }
  if(key === "." && !currentDisplay.textContent.includes(".")){
    currentDisplay.textContent += ".";
  }
  
  if(key === "+" || key === "-" || key === "*" || key === "/" ){
    operator = key;
    previous = currentDisplay.textContent;
    
    previousDisplay.textContent = previous + " " + operator;
    currentDisplay.textContent = "";
    playSound();
  }

  if(key === "Enter"){
    calculate();
  }

  if(key === "Backspace"){
    currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
  }

  if(key === "Escape"){
    previous = "";
    operator = "";

    previousDisplay.textContent = "";
    currentDisplay.textContent = "";
  }
})