const clear = document.querySelector('[data-clear]');
const deleteNumber = document.querySelector('[data-delete]');
const operator = document.querySelectorAll('[data-operation]');
const number = document.querySelectorAll('[data-number]');
const equals = document.querySelector('[data-equals]');
const main = document.querySelector('[data-main]');
const upper = document.querySelector('[data-upper]');

class Calculator {
    constructor(main, upper) {
        this.main = main;
        this.upper = upper;
        this.clear();
    }
    clear() {
        this.mainDisplay = '';
        this.upperDisplay = '';
        this.operation = undefined;
    }
    delete() {
        this.mainDisplay = this.mainDisplay
            .toString()
            .substr(0, this.mainDisplay.length - 1);
    }
    append(number) {
        if (number === '.' && this.mainDisplay.includes('.')) return;
        else {
            this.mainDisplay = this.mainDisplay.toString() + number.toString();
        }
    }
    update() {
        this.main.innerText = this.mainDisplay;
        if (this.operation != null) {
            this.upper.innerText = `${this.upperDisplay} ${this.operation}`;
        } else {
            this.upper.innerText = this.upperDisplay;
        }
    }
    chooseOperation(operation) {
        if (this.mainDisplay === '') return;
        if (this.upperDisplay !== '') {
            this.calculate();
        }
        this.operation = operation;
        this.upperDisplay = this.mainDisplay;
        this.mainDisplay = '';
    }
    calculate() {
        let result;
        const prev = parseFloat(this.upperDisplay);
        const current = parseFloat(this.mainDisplay);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        this.mainDisplay = result.toString();
        this.upperDisplay = '';
        this.operation = undefined;
    }
}

const calculator = new Calculator(main, upper);

clear.addEventListener('click', (button) => {
    calculator.clear();
    calculator.update();
});

number.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.append(button.innerText);
        calculator.update();
    });
});

operator.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.update();
    });
});

equals.addEventListener('click', (button) => {
    calculator.calculate();
    calculator.update();
});

deleteNumber.addEventListener('click', (button) => {
    calculator.delete();
    calculator.update();
});
