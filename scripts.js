let memory = 0;
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;


//Ievadīt skaitli
function input(char) {
    const display = document.getElementById('display');
    let currentValue = display.value;

    if (waitingForSecondValue) {
        currentValue = '0';
        waitingForSecondValue = false;
    }

    if (currentValue.length >= 7 && char >= '0' && char <= '9') return;

    if (char >= '0' && char <= '9') {
        if (currentValue === '0' || currentValue === '-0') {
            display.value = char;
        } else {
            display.value += char;
        }
    } else if (char === '.') {
        if (!currentValue.includes('.')) {
            display.value += char;
        }
    }
}

//vada un sagatavo, lai veiktu aprekinus.
function setOperator(op) {
    const display = document.getElementById('display');
    const currentValue = parseFloat(display.value.replace(',', '.'));

    if (operator && waitingForSecondValue) {
        operator = op;
        return;
    }

    if (firstValue === null) {
        firstValue = currentValue;
    } else if (operator) {
        const result = calculate();
        display.value = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = op;
}

//Saskaitit ,Atnemt ,Dalit, Reizinat vertibas
function calculate() {
    const display = document.getElementById('display');
    const secondValue = parseFloat(display.value.replace(',', '.'));

    if (operator === null || waitingForSecondValue) return display.value;

    let result;
    switch (operator) {
        case '+':
            result = firstValue + secondValue;
            break;
        case '-':
            result = firstValue - secondValue;
            break;
        case '*':
            result = firstValue * secondValue;
            break;
        case '/':
            if (secondValue === 0) {
                alert('Dalīt ar nulli nevar!');
                return firstValue;
            }
            result = firstValue / secondValue;
            break;
        default:
            return secondValue;
    }

    operator = null;
    firstValue = null;
    waitingForSecondValue = false;
    display.value = `${parseFloat(result.toFixed(7))}`;
    return result;
}


// attīra displeju
function clearDisplay() {
    document.getElementById('display').value = '0';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
}

//maina skaitļa zīmi (negatīvs vai pozitīvs)
function toggleSign() {
    const display = document.getElementById('display');
    let currentValue = display.value;

    if (currentValue.startsWith('-')) {
        display.value = currentValue.substring(1);
    } else if (currentValue !== '0') {
        display.value = '-' + currentValue;
    }
}

//Iegaumet vertibu
function memoryInput() {
    const display = document.getElementById('display');
    memory = parseFloat(display.value.replace(',', '.'));
    document.getElementById('memory').innerText = `Iegaumēts: ${memory}`;
    clearDisplay();
}


//Ievadit iegaumeto vertibu
function memoryRecall() {
    const display = document.getElementById('display');
    display.value = `${memory}`;
}
