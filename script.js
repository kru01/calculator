const input = document.getElementById('input');
const output = document.getElementById('ouput');

const numbers = document.querySelectorAll(`[data-numbers]`);
const operators = document.querySelectorAll(`[data-operators]`);

const equal = document.getElementById('equal');

let leftOperand = 0;
let rightOperand = 0;
let currOperator = '';

numbers.forEach(number => number.addEventListener('click', displayNumbers));
operators.forEach(operator => operator.addEventListener('click', displayOperators));

equal.addEventListener('click', operate);

function displayNumbers() {
    if(input.textContent === `0`) wipeScreen();
    
    input.textContent += this.textContent;
}

function wipeScreen() {
    input.textContent = ``;
}

function displayOperators() {
    if(input.textContent.slice(-1) === ` `)
        input.textContent = input.textContent.slice(0, input.textContent.indexOf(` `)) + ` ${this.textContent} `;

    else if(/.+\s[+\-×÷%]\s.+/.test(input.textContent))
        evaluate();
        
    else input.textContent += ` ${this.textContent} `;
}

function evaluate() {
    console.log(`hi`);
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