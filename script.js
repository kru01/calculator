const input = document.getElementById('input');
const output = document.getElementById('output');

const numbers = document.querySelectorAll(`[data-numbers]`);
const operators = document.querySelectorAll(`[data-operators]`);

const allClear = document.getElementById('allClear');
const del = document.getElementById('delete');
const equal = document.getElementById('equal');

let leftOperand = 0;
let rightOperand = 0;
let currOperator = '';

let operandHolder = '';
let isEqualPressed = false;


starter();


function starter() {
    window.addEventListener('keydown', keyboardInput);

    numbers.forEach(number => number.addEventListener('click', displayNumbers));
    operators.forEach(operator => operator.addEventListener('click', displayOperators));
    
    allClear.addEventListener('click', allClearPressed);
    del.addEventListener('click', delPressed);
    equal.addEventListener('click', equalPressed);
}

function keyboardInput(e) {
    const numbersArray = [...numbers];
    const operatorsArray = [...operators];
    
    if(e.key >= 0 && e.key <= 9 || e.key === `.`) {
        const pressed = numbersArray.find(number => {
            if(number.textContent === `${e.key}`) return true;
        });
    
        pressed.click();
    }

    if(e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '%') {
        const pressed = operatorsArray.find(operator => {
            if(operator.textContent === `${keyboardConvert(e.key)}`) return true;
        });

        pressed.click();
    }

    if(e.key === 'Escape' || e.key === 'Delete') allClearPressed();
    if(e.key === 'Backspace') delPressed();
    if(e.key === 'Enter') equalPressed();
}

function keyboardConvert(input) {
    if(input === '*') return '×';
    if(input === '/') return '÷';

    return input;
}

function displayNumbers() {
    if(input.textContent === `0`) wipeScreen();
    
    if(operandHolder.length >= 16) {
        operandHolder = (+operandHolder).toExponential(2);

        if(/.+\s[+\-×÷%]\s/.test(input.textContent))
            input.textContent = input.textContent.slice(0, input.textContent.lastIndexOf(' ') + 1) + operandHolder;

        else input.textContent = operandHolder;
    }

    input.textContent += this.textContent;

    if(/.+\s[+\-×÷%]\s/.test(input.textContent))
        operandHolder = input.textContent.slice(input.textContent.lastIndexOf(' ') + 1);

    else operandHolder = input.textContent;

    if(/-?[\d.]+(?:e-?\d+)?/.test(output.textContent)) equalPressed();
}

function wipeScreen() {
    input.textContent = ``;
}

function displayOperators() {
    operandHolder = '';

    if(input.textContent.slice(-1) === ` `)
        input.textContent = input.textContent.slice(0, input.textContent.indexOf(` `)) + ` ${this.textContent} `;

    else if(/.+\s[+\-×÷%]\s.+/.test(input.textContent)) {
        let nextOperator = this.textContent;
        output.textContent = ``;

        evaluate();
        input.textContent = `${leftOperand} ${nextOperator} `;
    }

    else input.textContent += ` ${this.textContent} `;
}

function evaluate() {
    [leftOperand, currOperator, rightOperand] = input.textContent.split(' ');
    
    if(!currOperator) {
        output.textContent = leftOperand;
        return;
    }
    
    let result = operate(currOperator, leftOperand, rightOperand);

    if(input.textContent.includes("Infinity") || result === null) 
        result = `Infinity`;

    else result = (!Number.isInteger(result)) ? result.toFixed(2) 
                : (result.toString().length >= 16) ? result.toExponential(2)
                : result ;
    
    if(isEqualPressed) {
        input.textContent = `${leftOperand} ${currOperator} ${rightOperand}`;

        if(result === null) output.textContent = `Error`;

        else output.textContent = result; 

        isEqualPressed = false;
    }
    
    leftOperand = result;
}

function allClearPressed() {
    input.textContent = 0;
    output.textContent = '';

    leftOperand = 0;
    rightOperand = 0;
    currOperator = '';
    isEqualPressed = false;
}

function delPressed() {
    if(input.textContent.slice(-1) === ` `)
        input.textContent = input.textContent.slice(0, input.textContent.indexOf(` `));
    
    else if(input.textContent.length === 1 
            || input.textContent.length === 2 && /\-\d/.test(input.textContent)
            || input.textContent === 'Infinity' 
            || input.textContent === 'NaN') {

        input.textContent = 0;

    } else input.textContent = input.textContent.slice(0, -1);

    if(/-?[\d.]+(?:e-?\d+)?/.test(output.textContent)) equalPressed();
}

function equalPressed() {
    isEqualPressed = true;
    evaluate();
}

function operate(operator, num1, num2) {
    num1 = +num1;
    num2 = +num2;

    switch(operator) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '×': return num1 * num2;
        case '÷': 
            if(num2 === 0) return null;
            return num1 / num2;
        case '%':
            if(num2 === 0) return null;
            return num1 % num2;
    }
}