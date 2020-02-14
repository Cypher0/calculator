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

let chained = false; // for stringing multiple operations

numKeys.forEach((key) => {
  key.addEventListener('click', () => {
    // populate display when clicking numpad numbers
    if (!chained) { 
      displayContent.textContent += key.textContent;
      display.appendChild(displayContent);
    // when chaining, clear previous result from display before populating
    } else {
      chained = false;
      displayContent.textContent = key.textContent;
    }
  })
})

operatorKeys.forEach((key) => {
  key.addEventListener('click', () => {
    // logic if it's the first operation
    if (!selectedOperator) {
      firstOperand = displayContent.textContent;
      selectedOperator = key.textContent;
      miniDisplayContent.textContent = `${firstOperand} ${selectedOperator}`;
      miniDisplay.appendChild(miniDisplayContent);
      displayContent.textContent = ''; // clear display for accepting second operand
    // logic for chaining multiple operations
    } else {
      chained = true;
      secondOperand = displayContent.textContent;
      // calculate intermediate result
      let result = operate(selectedOperator, firstOperand, secondOperand);
      firstOperand = result; // and use it as first operand for next operation
      selectedOperator = key.textContent;
      miniDisplayContent.textContent += ` ${secondOperand} ${selectedOperator}`;
      displayContent.textContent = firstOperand; // display result of previous operation
      secondOperand = ''; // clear display for accepting second operand
    }
  })
})

equalsKey.addEventListener('click', () => {
  secondOperand = displayContent.textContent;
  if (firstOperand && selectedOperator) {
    // when second operand is not defined, operate firstOperand twice
    if (!secondOperand) {
      secondOperand = firstOperand;
    }
    let result = operate(selectedOperator, firstOperand, secondOperand);
    miniDisplayContent.textContent += ` ${secondOperand}`;
    displayContent.textContent = result;
    firstOperand = result; // prepare the vars for possible future use
    secondOperand = '';
    selectedOperator = '';
  }
})

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
