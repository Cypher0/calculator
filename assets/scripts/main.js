const allKeys = document.querySelectorAll('.calc-btn');

const numKeys = document.querySelectorAll('.btn-numpad');
const commaKey = document.querySelector('.btn-comma');
const operatorKeys = document.querySelectorAll('.btn-operator');
const equalsKey = document.querySelector('.btn-operate');
const clearKey = document.querySelector('.btn-clear');
const backspaceKey = document.querySelector('.btn-backspace');
const negativeKey = document.querySelector('.btn-negative');

const displayContainer = document.querySelector('#calc-display');
const miniDisplayContainer = document.querySelector('#calc-display-mini');

let display = document.createElement('p');
let miniDisplay = document.createElement('p');

let firstOperand;
let secondOperand;
let selectedOperator;
let result;
let displayResult = false;

// Disable selecting on double click
allKeys.forEach((btn) => {
  btn.addEventListener('mousedown', (e) => {
    e.preventDefault();
  }, false)
})

clearKey.addEventListener('click', () => {
  clear();
})

numKeys.forEach((key) => {
  key.addEventListener('click', () => {
    // if a result has been calculated, start entering a new operand
    if (displayResult) {
      clear();
      setDisplay(key.textContent);
    // else just add to display until full
    } else if (display.textContent.length < 10) {      
      addToDisplay(key.textContent);
    }
  })
})

commaKey.addEventListener('click', () => {
  // When chaining, then starting second operand with '.', clear display
  if (!secondOperand && selectedOperator && result === firstOperand) {
    setDisplay('');
    result = '';
  }
  // If display is clear or showing last result, prepend 0 (should display 0.5 not .5)
  if (!display.textContent || displayResult) {
    setDisplay('0');
    displayResult = false;
  }
  // Add comma to display unless it already has one
  if (!display.textContent.includes('.')) {
    addToDisplay('.');
  }
})

backspaceKey.addEventListener('click', () => {
  if (display.textContent) {
    display.textContent = display.textContent.slice(0, -1);
  }
})

negativeKey.addEventListener('click', () => {
  if (display.textContent && display.textContent != '0') {
    let num = Number(display.textContent);
    let displayText = display.textContent;
    num > 0 ? setDisplay("-" + displayText) : setDisplay(displayText.slice(1));
  }
})

operatorKeys.forEach((key) => {
  key.addEventListener('click', () => {
    // If displaying result, use it as firstOperand for new operation
    if (displayResult) {
      firstOperand = result;
      result = '';
      selectedOperator = key.textContent;
      setDisplay('');
      setMiniDisplay(`${firstOperand} ${selectedOperator}`);
      displayResult = false;
      secondOperand = '';
    } else if (!secondOperand) {
      // If firstOperand and operator exist and display has secondOperand (chaining)
      if (selectedOperator && display.textContent) {
        secondOperand = display.textContent;
        firstOperand = operate(selectedOperator, firstOperand, secondOperand);
        selectedOperator = key.textContent;
        setDisplay('');
        addToMiniDisplay(` ${secondOperand} ${selectedOperator}`);
        secondOperand = '';
      // change operator if you haven't started entering secondOperand yet
    } else if (selectedOperator && !display.textContent) {
        selectedOperator = key.textContent;
        setMiniDisplay(`${miniDisplay.textContent.slice(0, -2)} ${selectedOperator}`);
      // Standard case - Set display value as firstOperand, wait for secondOperand
      } else {
        selectedOperator = key.textContent;
        display.textContent ? firstOperand = display.textContent : firstOperand = 0;
        setDisplay('');
        addToMiniDisplay(`${firstOperand} ${selectedOperator}`);  
      }
    }
  })
})

equalsKey.addEventListener('click', () => {
  // operate only if you have all 3 components and no result has been calculated
  if (firstOperand && display.textContent && selectedOperator && !result) {
      secondOperand = display.textContent;
      addToMiniDisplay(` ${secondOperand}`);
      result = operate(selectedOperator, firstOperand, secondOperand);
      setDisplay(result);
      firstOperand = result;
      secondOperand = '';
      displayResult = true;
  }
})

function setDisplay(content) {
  if (content.toString().length > 10) { content = content.toString().slice(0, 10); }
  display.textContent = content;
}

function addToDisplay(content) {
  display.textContent += content;
}

function setMiniDisplay(content) {
  miniDisplay.textContent = content;
}

function addToMiniDisplay(content) {
  miniDisplay.textContent = (miniDisplay.textContent + content).slice(-24);
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
  if (Number(num2) === 0) {
    return "nope;)"
  } else {
    return Number(num1) / Number(num2);
  }
}

function operate(operator, num1, num2) {
  switch (operator) {
    case '+': return add(num1, num2);
    case '-': return subtract(num1, num2);
    case '*': return multiply(num1, num2);
    case '/': return divide(num1, num2);
  }
}

function clear() {
  firstOperand = '';
  secondOperand = '';
  selectedOperator = '';
  result = '';
  displayResult = false;
  setDisplay('');
  setMiniDisplay('');
  displayContainer.appendChild(display);
  miniDisplayContainer.appendChild(miniDisplay);
}
