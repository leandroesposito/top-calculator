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
    decimals: "",
    operator: null,
    decimalMode: false,
    clearMemory() {
        this.num1 = null;
        this.num2 = null;
        this.decimals = "";
        this.operator = null;
        this.decimalMode = false;
    },
    setOperator(operator) {
        this.operator = operator;
        if (this.num1 === null && this.num2 !== null) {
            this.switchNumbers();
        }
        this.decimals = "";
    },
    switchNumbers() {
        this.num1 = this.getNum2();
        this.num2 = null;
        this.decimalMode = false;
    },
    calculate() {
        let result = null;
        if (this.allSet()) {
            result = operate(this.getNum1(), this.getNum2(), this.operator);
            this.clearMemory();
            if (!isNaN(result)) {
                let [digits, decimals] = result.toString().split(".")
                this.num2 = Number(digits);
                this.decimals = decimals;
            }
        }
        return result;
    },
    allSet() {
        return (this.num1 !== null &&
            this.num2 !== null &&
            this.operator !== null);
    },
    decimalModeOn() {
        this.decimalMode = true;
        this.num2 = this.num2 ?? 0;
    },
    appendNumber(number) {
        if (this.decimalMode) {
            this.decimals += number.toString();
        }
        else {
            this.num2 = this.num2 * 10 + number;
        }
    },
    getNum1() {
        return this.num1;
    },
    getNum2() {
        if (this.decimals) {
            return parseFloat(this.num2ToString());
        }
        else {
            return this.num2;
        }
    },
    num2ToString() {
        return this.num2.toString() + (this.decimals ? "." + this.decimals : "");
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
    if (target.classList.contains("number")) {
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
    else if (target.classList.contains("dot")) {
        if (calculation.operator === "=") {
            calculation.clearMemory();
        }
        if (!calculation.decimalMode) {
            calculation.decimalModeOn();
            updateDisplay(calculation.num2ToString());
        }
    }
});

function appendNumber(number) {
    newDigit = +number;
    calculation.appendNumber(newDigit);
    updateDisplay(calculation.num2ToString());
}

function clearDisplay() {
    updateDisplay("");
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