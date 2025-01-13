const display = document.querySelector(".display");
const numbersKeypad = document.querySelector(".numbers-keypad");
const operatorsKeypad = document.querySelector(".operators-keypad");

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
        if (this.num1 === null && this.num2 !== null) {
            this.switchNumbers();
        }
    },
    switchNumbers() {
        this.num1 = this.num2;
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
        if (calculation.operator === "=") {
            calculation.clearMemory();
        }
        const buttonValue = getDataValue(target);
        appendNumber(buttonValue);
    }
    else if (target.classList.contains("clear")) {
        calculation.clearMemory();
        clearDisplay();
    }
});

function appendNumber(number) {
    calculation.appendNumber(number);
    updateDisplay(calculation.num2);
}

function clearDisplay() {
    updateDisplay("0");
}

function updateDisplay(number) {
    if (number !== null) {
        display.textContent = number;
    }
}

operatorsKeypad.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("button")) {
        const result = calculation.calculate();
        updateDisplay(result);
    }
    if (target.classList.contains("operator")) {
        const buttonValue = getDataValue(target);
        calculation.setOperator(buttonValue);
    }
});

function getDataValue(element) {
    return element.getAttribute("data-value");
}