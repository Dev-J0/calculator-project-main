class Calcu {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = '';
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.'))return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return;
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation
        const previ = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(previ) || isNaN(current)) return
        switch(this.operation) {
            case'+':
                computation = previ + current
                break;
            case'-':
                computation = previ - current
                break;
            case'/':
                computation = previ / current
                break;
            case'*':
                computation = previ * current
                break;
            default: return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getScreenNumber(number) {
        const floatNumber = parseFloat(number);
        if (isNaN(floatNumber)) return '';
        return floatNumber.toLocaleString('en');
    }
    
    updateScreen() {
        this.currentOperandTextElement.innerText = this.getScreenNumber(this.currentOperand);
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.getScreenNumber(this.previousOperand)} ${this.operation}`;
        }
    }
}



const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

const Calculator = new Calcu(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
    Calculator.appendNumber(button.innerText);
    Calculator.updateScreen();
})
});


for (const button of operationButtons) {
    button.addEventListener('click', () => {
    Calculator.chooseOperation(button.innerText);
    Calculator.updateScreen();
})
}

equalsButton.addEventListener('click', button => {
    Calculator.compute();
    Calculator.updateScreen();
})

allClearButton.addEventListener('click', button => {
    Calculator.clear();
    Calculator.updateScreen();
})

deleteButton.addEventListener('click', button => {
    Calculator.delete();
    Calculator.updateScreen();
})