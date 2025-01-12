const numbersKeypad = document.querySelector(".numbers-keypad");
const display = document.querySelector(".display");

const operations = {
    add(a, b) {
        return a + b;
    },
    substract(a, b) {
        return a - b;
    },
    multiply(a, b) {
        return a * b;
    },
    divide(a, b) {
        if (b == 0) {
            return "CAN'T DIVIDE BY ZERO";
        }

        return a / b;
    }
};

const calculation = {
    num1: null,
    num2: null,
    operand: null,
    clearMemory() {
        this.num1 = null;
        this.num2 = null;
        this.operand = null;
    },
}

function operate(num1, num2, operator) {
    let result = null;
    switch (operator) {
        case "+":
            result = operations.add(num1, num2);
            break;
        case "-":
            result = operations.substract(num1, num2);
            break;
        case "*":
            result = operations.multiply(num1, num2);
            break;
        case "/":
            result = operations.divide(num1, num2);
            break;
        default:
            result = "OPERATION NOT SUPPORTED";
            break;
    }

    return result;
}

numbersKeypad.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("number")) {
        const buttonValue = event.target.getAttribute("data-value");
        addDigit(buttonValue);
    }
    else if (target.classList.contains("clear")) {
        calculation.clearMemory();
    }
});

function addDigit(number) {
    newDigit = +number;
    calculation.num2 = calculation.num2 * 10 + newDigit;

    updateDisplay(calculation.num2);
}

function updateDisplay(number) {
    display.textContent = number;
}