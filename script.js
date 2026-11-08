const display = document.getElementById("display");

let currentInput = "0";
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

function updateDisplay() {
    display.value = currentInput;
}

function appendNumber(number) {
    if (currentInput === "Error") {
        currentInput = "0";
    }

    if (waitingForSecondNumber) {
        currentInput = number;
        waitingForSecondNumber = false;
    } else {
        currentInput = currentInput === "0"
            ? number
            : currentInput + number;
    }

    updateDisplay();
}

function appendDecimal() {
    if (currentInput === "Error") {
        currentInput = "0";
    }

    if (waitingForSecondNumber) {
        currentInput = "0.";
        waitingForSecondNumber = false;
    } else if (!currentInput.includes(".")) {
        currentInput += ".";
    }

    updateDisplay();
}

function appendOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (nextOperator === "%") {
        currentInput = String(inputValue / 100);
        updateDisplay();
        return;
    }

    if (operator && !waitingForSecondNumber) {
        calculate();
    }

    firstNumber = parseFloat(currentInput);
    operator = nextOperator;
    waitingForSecondNumber = true;
}

function calculate() {
    if (operator === null || waitingForSecondNumber) return;

    const secondNumber = parseFloat(currentInput);
    let result;

    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":
            result = secondNumber === 0
                ? "Error"
                : firstNumber / secondNumber;
            break;
    }

    currentInput = result === "Error"
        ? "Error"
        : String(Number(result.toPrecision(12)));

    firstNumber = null;
    operator = null;
    waitingForSecondNumber = true;

    updateDisplay();
}

function clearDisplay() {
    currentInput = "0";
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;

    updateDisplay();
}

function deleteLast() {
    if (currentInput === "Error" || waitingForSecondNumber) {
        currentInput = "0";
        waitingForSecondNumber = false;
    } else {
        currentInput = currentInput.length > 1
            ? currentInput.slice(0, -1)
            : "0";
    }

    updateDisplay();
}