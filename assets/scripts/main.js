const numKeys = document.querySelectorAll('.btn-numpad');
const operatorKeys = document.querySelectorAll('.btn-operator');
const equalsKey = document.querySelector('.btn-operate');
const clearKey = document.querySelector('.btn-clear')

const displayContainer = document.querySelector('#calc-display');
const miniDisplayContainer = document.querySelector('#calc-display-mini');

let display = document.createElement('p');
let miniDisplay = document.createElement('p');

let firstOperand;
let secondOperand;
let selectedOperator;

let chained = false;

numKeys.forEach((key) => {
  key.addEventListener('click', () => {
    if (!chained) { 
      if (display.textContent.length < 10) {
        if (display.textContent == '0') {
          setDisplay(key.textContent);
        } else {
          addToDisplay(key.textContent);         
        }
      }
    } else {
      chained = false;
      setDisplay(key.textContent);
    }
  })
})

operatorKeys.forEach((key) => {
  key.addEventListener('click', () => {
    if (!selectedOperator) {
      firstOperand = display.textContent;
      selectedOperator = key.textContent;
      setMiniDisplay(`${firstOperand} ${selectedOperator}`);
      setDisplay('');
    } else {
      chained = true;
      secondOperand = display.textContent;
      firstOperand = operate(selectedOperator, firstOperand, secondOperand);
      selectedOperator = key.textContent;
      addToMiniDisplay(` ${secondOperand} ${selectedOperator}`);
      setDisplay(firstOperand.toString());
      secondOperand = '';
    }
  })
})

equalsKey.addEventListener('click', () => {
  secondOperand = display.textContent;
  if (firstOperand && selectedOperator) {
    if (!secondOperand) {
      secondOperand = firstOperand;
    }
    addToMiniDisplay(` ${secondOperand}`)
    let result = operate(selectedOperator, firstOperand, secondOperand);
    setDisplay(result.toString());
    firstOperand = result;
    secondOperand = '';
    selectedOperator = '';
  }
})

clearKey.addEventListener('click', () => {
  clear();
})

function setDisplay(content) {
  display.textContent = content.slice(0, 10);
}

function addToDisplay(content) {
  display.textContent = (display.textContent + content).slice(0, 10);
}

function setMiniDisplay(content) {
  miniDisplay.textContent = content.slice(-22, 22);
}

function addToMiniDisplay(content) {
  miniDisplay.textContent = (miniDisplay.textContent + content).slice(-22, 22);
}

function add(num1, num2) {
  return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
  return Number(num1) - Number(num2);
}

function multiply(num1, num2) {
  return Number(num1) * Number(num2);
}

function divide(num1, num2) {
  return Number(num1) / Number(num2);
}

function operate(operator, num1, num2) {
  switch (operator) {
    case '+':
      return add(num1, num2);
      break;
    case '-':
      return subtract(num1, num2);
      break;
    case '*':
      return multiply(num1, num2);
      break;
    case '/':
      return divide(num1, num2);
  }
}

function clear() {
  firstOperand = '';
  secondOperand = '';
  selectedOperator = '';
  chained = false;
  setDisplay('0');
  setMiniDisplay('');
  displayContainer.appendChild(display);
  miniDisplayContainer.appendChild(miniDisplay);
}
