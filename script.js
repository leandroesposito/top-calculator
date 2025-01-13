const display = document.querySelector(".display");
const numbersKeypad = document.querySelector(".numbers-keypad");
const operatorsKeypad = document.querySelector(".operators-keypad");
const backspaceButton = document.querySelector(".backspace");

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
    operator: null,
    clearMemory() {
        this.num1 = null;
        this.num2 = null;
        this.operator = null;
    },
    setOperator(operator) {
        this.operator = operator;
        if (this.num1 === null) {
            this.switchNumbers();
        }
    },
    switchNumbers() {
        this.num1 = this.num2 ?? "0";
        this.num2 = null;
    },
    calculate() {
        let result = null;
        if (this.allSet()) {
            result = operate(this.getNum1(), this.getNum2(), this.operator);
            this.clearMemory();
            if (!isNaN(result)) {
                this.num2 = result.toString();
            }
        }
        return result;
    },
    allSet() {
        return (this.num1 !== null &&
            this.num2 !== null &&
            this.operator !== null);
    },
    appendNumber(number) {
        if (number === ".") {
            if (this.num2 === null) {
                // this result in "0." later
                this.num2 = "0";
            }
            else if (this.num2.includes(".")) {
                // ignore multiple "."
                return
            }
        }

        if (number || number === "0") {
            this.num2 = (this.num2 ?? "") + number;
        }
    },
    removeLastNumber() {
        if (this.num2 !== null) {
            let newNumber = this.num2.slice(0, -1);
            this.num2 = newNumber !== "" ? newNumber : null;
        }
    },
    getNum1() {
        return parseFloat(this.num1 ?? 0);
    },
    getNum2() {
        return parseFloat(this.num2 ?? 0);
    },
    num2ToString() {
        return this.num2.toString();
    }
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
    if (target.classList.contains("number") ||
        target.classList.contains("dot")) {
        const buttonValue = getDataValue(target);
        handleNumberPress(buttonValue);
    }
    else if (target.classList.contains("clear")) {
        clear();
    }
});

function clear() {
    calculation.clearMemory();
    clearDisplay();
}

function handleNumberPress(buttonValue) {
    if (calculation.operator === "=") {
        calculation.clearMemory();
    }
    appendNumber(buttonValue);
}

function appendNumber(number) {
    calculation.appendNumber(number);
    updateDisplay(calculation.num2);
}

function clearDisplay() {
    updateDisplay("0");
}

function updateDisplay(number) {
    display.textContent = number ? number : "0";
}

operatorsKeypad.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("operator")) {
        const buttonValue = getDataValue(target);
        handleOperatorPress(target, buttonValue);
    }
});

function handleOperatorPress(buttonValue) {
    const result = calculation.calculate();
    if (result !== null) {
        updateDisplay(result);
    }
    calculation.setOperator(buttonValue);
}

function getDataValue(element) {
    return element.getAttribute("data-value");
}

backspaceButton.addEventListener("click", (event) => {
    removeLastNumber();
    event.stopImmediatePropagation();
});

function removeLastNumber() {
    if (calculation.operator === "=") {
        calculation.clearMemory();
    }
    else {
        calculation.removeLastNumber();
    }
    updateDisplay(calculation.num2);
}

document.body.addEventListener("keydown", (event) => {
    const key = event.key;
    console.log(key)
    if ("0123456789.".includes(key)) {
        handleNumberPress(key);
    }
    if ("+-*/".includes(key)) {
        handleOperatorPress(key);
    }
    if (key === "Enter") {
        handleOperatorPress("=");
    }
    if (key === "Backspace") {
        removeLastNumber();
    }
    if (key === "Escape") {
        clear();
    }
});
