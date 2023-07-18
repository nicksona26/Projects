// Create a class named Calculator to handle calculator operations.
class Calculator {
    // Constructor function to initialize the calculator with previous and current operand elements.
    constructor(previousOperandTextElement, currentOperandTextElement) {
        // Store references to the previous and current operand elements.
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        // Clear the calculator when it's initialized.
        this.clear();
    }

    // Method to clear the current and previous operands, and reset the operation.
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // Method to delete the last character from the current operand.
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // Method to append a number to the current operand.
    appendNumber(number) {
        // Avoid adding multiple decimal points.
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    // Method to choose an operation for the calculator.
    chooseOperation(operation) {
        // If there is no current operand, return early.
        if (this.currentOperand === '') return;
        // If there is a previous operand, perform the computation first.
        if (this.previousOperand !== '') {
            this.compute();
        }
        // Store the chosen operation and move the current operand to the previous operand.
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    // Method to perform the computation based on the stored operation.
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        // If the operands are not valid numbers, return early.
        if (isNaN(prev) || isNaN(current)) return;
        // Perform the appropriate calculation based on the operation.
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        // Update the current operand with the result, and clear the previous operand and operation.
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    // Method to format the number for display (adding thousand separators and handling decimals).
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        // Check if the integer digits are NaN, and set the display accordingly.
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        // If there are decimal digits, return the formatted number with a decimal point.
        // Otherwise, return only the integer part.
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    // Method to update the display elements with the current and previous operands.
    updateDisplay() {
        // Set the text content of the current operand element to the formatted current operand.
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        // If there is an operation, set the text content of the previous operand element
        // to the formatted previous operand followed by the operation symbol.
        // Otherwise, clear the previous operand element.
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

// Get references to DOM elements for number buttons, operation buttons, and other elements.
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// Create an instance of the Calculator class, passing in the necessary DOM elements.
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Add event listeners to the number buttons to append the clicked number to the current operand and update the display.
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

// Add event listeners to the operation buttons to choose the clicked operation and update the display.
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

// Add an event listener to the equals button to compute the result and update the display.
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

// Add an event listener to the all-clear button to clear the calculator and update the display.
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

// Add an event listener to the delete button to remove the last character from the current operand and update the display.
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});
