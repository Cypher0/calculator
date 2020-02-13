const numKeys = document.querySelectorAll('.btn-numpad');
const operatorKeys = document.querySelectorAll('.btn-operator');
const equalsKey = document.querySelector('.btn-operate');
const display = document.querySelector('#calc-display');
const miniDisplay = document.querySelector('#calc-display-mini');
let displayContent = document.createElement('p');
let miniDisplayContent = document.createElement('p');
let firstOperand;
let secondOperand;
let selectedOperator;

numKeys.forEach((key) => {
  key.addEventListener('click', () => {
    displayContent.textContent += key.textContent;
    display.appendChild(displayContent);
  })
})

operatorKeys.forEach((key) => {
  key.addEventListener('click', () => {
    firstOperand = displayContent.textContent;
    miniDisplayContent.textContent = firstOperand + key.textContent;
    miniDisplay.appendChild(miniDisplayContent);
    selectedOperator = key.textContent;
    displayContent.textContent = '';
  })
})

equalsKey.addEventListener('click', () => {
  secondOperand = displayContent.textContent;
  if (firstOperand && secondOperand && selectedOperator) {
    result = operate(selectedOperator, firstOperand, secondOperand);
    displayContent.textContent = result;
    firstOperand = result;
    secondOperand = '';
  }
})

function add(num1, num2) {
  return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
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
