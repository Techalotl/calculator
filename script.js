function add (num1, num2) {
    result = (+num1.join("") + +num2.join(""))
    if (`${result}`.length > 9) {
        return result.toExponential(3);
    } else {
        return result;
    }
}

function subtract (num1, num2) {
    result = num1.join("") - num2.join("");
    if (`${result}`.length > 9) {
        return result.toExponential(3);
    } else {
        return result;
    }
}

function multiply (num1, num2) {
    result = num1.join("")*num2.join("");
    if (`${result}`.length > 9) {
        return result.toExponential(3);
    } else {
        return result;
    }
}

function divide (num1, num2) {
    if (num2 == 0 || num2.join("") == 0) {
        firstNum.length = 0;
        secondNum.length = 0;
        result = 0;
        operator.length = 0;
        return getSnarkyErrorMessage();
    } else {
        result = num1.join("")/num2.join("");
        if (`${result}`.length > 9) {
            return result.toExponential(3);
        } else {
            return result;
        }
    }
}

function percentage (num1, num2) {
    result = (num1.join("")/100)*num2.join("");
    if (`${result}`.length > 9) {
        return result.toExponential(3);
    } else {
        return result;
    }
}

function operate (num1, num2, operator) {
    if (operator == "+") {
        return add(num1, num2);
    } else if (operator == "-") {
        return subtract(num1, num2);
    } else if (operator == "*" || operator == "×") {
        return multiply(num1, num2);
    } else if (operator == "/" || operator == "÷") {
        return divide(num1, num2);
    } else if (operator == "%") {
        return percentage(num1, num2);
    } else {
        alert("SOMETHING WENT TERRIBLY WRONG.");
    }
}

function pushChar (char) {
    if (firstNum.length === 0 && operator.length === 0 && secondNum.length === 0) {
        if (char == ".") {
            firstNum.push("0");
            firstNum.push(char);
            console.log(firstNum);
            screen.textContent = firstNum.join("");
            point.disabled = true;
        } else {
            firstNum.push(char);
            console.log(firstNum);
            screen.textContent = firstNum.join("");
        }
    } else if (firstNum.length >= 1 && operator.length === 0 && secondNum.length === 0) {
        if (firstNum.length === 9) {
            return;
        } else if (firstNum.includes(".") && char == ".") {
            point.disabled = true;
            return;
        } else if (firstNum.length === 1 && firstNum[0] == 0 && char == 0) {
            return;
        } else if (firstNum.length === 1 && firstNum[0] == 0 && !(char == 0 || char == ".")) {
            firstNum.push(char);
            firstNum.shift();
            console.log(firstNum);
            screen.textContent = firstNum.join("");
        } else {
            firstNum.push(char);
            console.log(firstNum);
            screen.textContent = firstNum.join("");
        }
    } else if (firstNum.length >= 1 && operator.length === 1 && secondNum.length === 0) {
        if (char == ".") {
            point.disabled = true;
            secondNum.push("0");
            secondNum.push(char);
            console.log(secondNum);
            screen.textContent = secondNum.join("");
        } else {
            secondNum.push(char);
            console.log(secondNum);
            screen.textContent = secondNum.join("");
        }
    } else if (firstNum.length >= 1 && operator.length === 1 && secondNum.length >= 1) {
        if (secondNum.length === 9) {
            return;
        } else if (secondNum.length === 1 && secondNum[0] == 0 && char == 0) {
            return;
        } else if (secondNum.length === 1 && secondNum[0] == 0 && !(char == 0 || char == ".")) {
            secondNum.push(char);
            secondNum.shift();
            console.log(secondNum);
            screen.textContent = secondNum.join("");
        } else if (secondNum.includes(".") && char == ".") {
            point.disabled = true;
            return;
        } else {
            secondNum.push(char);
            console.log(secondNum);
            screen.textContent = secondNum.join("");
        }
    } else {
        console.log("I'm smelling a mistake over here...");
    }
}

function pushOperator (char) {
    if (firstNum.length === 0) {
        return;
    } else {
        operator.push(char);
        operatorsOperating();
        point.disabled = false;
    }
}

function operatorsOperating () {
    if (operator.length > 1) {
        screen.textContent = operate(firstNum, secondNum, operator[0]);
        operator.shift();
        firstNum = result.toString().split("");
        secondNum.length = 0;
    }
}

function getSnarkyErrorMessage () {
    let randomNum = Math.floor(Math.random()*7)
    return messages[randomNum];
}

function subtracting (char) {
    if (firstNum.length === 0) {
        firstNum.push("0");
        pushOperator(char);
        operatorsOperating();
        point.disabled = false;
    } else {
        pushOperator(char);
        operatorsOperating();
        point.disabled = false;
    }
}

function getResult () {
    if (firstNum.length === 0 && operator.length === 0 && secondNum.length === 0) {
        screen.textContent = 0;
    } else if (firstNum.length > 0 && (operator.length === 0 || operator.length > 0) && secondNum.length === 0) {
        screen.textContent = firstNum.join("");
    } else {
        screen.textContent = operate(firstNum, secondNum, operator);
        operator.length = 0;
        secondNum.length = 0;
        firstNum = result.toString().split("");
    }
}

function deleteChar () {
    if (firstNum.length === 1 && operator.length === 0 && secondNum.length === 0) {
        firstNum[0] = "0";
        screen.textContent = firstNum;
    } else if (firstNum.length > 1 && operator.length === 0 && secondNum.length === 0) {
        firstNum.pop();
        screen.textContent = firstNum.join("");
    } else if (firstNum.length > 1 && operator.length > 0 && secondNum.length === 1) {
        secondNum[0] = "0";
        screen.textContent = secondNum;
    } else if (firstNum.length > 1 && operator.length > 0 && secondNum.length > 0) {
        secondNum.pop();
        screen.textContent = secondNum.join("");
    } else {
        console.log("YET ANOTHER MISTAKE")
    }
}

const screen = document.querySelector(".calculator-screen");
const plus = document.querySelector(".plus-button");
const minus = document.querySelector(".minus-button");
const multi = document.querySelector(".multiplication-button");
const division = document.querySelector(".division-button");
const percent = document.querySelector(".percentage-button");
const point = document.querySelector(".point-button");
const equal = document.querySelector(".equal-button");
const del = document.querySelector(".backspace-button");
const aC = document.querySelector(".ac-button");
const numberButtons = document.querySelectorAll(".number");

let firstNum = [];
let secondNum = [];
let operator = [];
let result
const messages = ["ඞ", "( ͠° ͟ʖ ͡°)", "LOL! No.", "Nope", "🤡", "(☞ ͡° ͜ʖ ͡°)☞"]

numberButtons.forEach(button => {
    button.addEventListener("click", e => {
        pushChar(e.target.innerText);
    })
})

window.addEventListener("keydown", (e) => {
    console.log(e.key);
    switch (e.key) {
        case "1":
            pushChar(`${e.key}`);
            break;
        case "2":
            pushChar(`${e.key}`);
            break;
        case "3":
            pushChar(`${e.key}`);
            break;
        case "4":
            pushChar(`${e.key}`);
            break;
        case "5":
             pushChar(`${e.key}`);
             break;
        case "6":
            pushChar(`${e.key}`);
            break;
        case "7":
            pushChar(`${e.key}`);
            break;
        case "8":
            pushChar(`${e.key}`);
            break;
        case "9":
            pushChar(`${e.key}`);
            break;
        case "0":
            pushChar(`${e.key}`);
            break;
        case ".":
            pushChar(`${e.key}`);
            break;
        case "+":
            pushOperator(`${e.key}`);
            break;
        case "-":
            subtracting(`${e.key}`);
            break;
        case "*":
            pushOperator(`${e.key}`);
            break;
        case "/":
            pushOperator(`${e.key}`);
            break;
        case "%":
            pushOperator(`${e.key}`);
            break;
        case "Enter":
            getResult();
            break;
        case "Backspace":
            deleteChar();
            break;
        default:
            return;
    }
})

point.addEventListener("click", (e) => {
    pushChar(`${e.target.innerText}`);
})

plus.addEventListener("click", (e) => {
    pushOperator(`${e.target.innerText}`);
});

minus.addEventListener("click", (e) => {
    subtracting (`${e.target.innerText}`);
})

multi.addEventListener("click", (e) => {
    pushOperator(`${e.target.innerText}`);
})

division.addEventListener("click", (e) => {
    pushOperator(`${e.target.innerText}`);
})

percent.addEventListener("click", (e) => {
    pushOperator(`${e.target.innerText}`);
})

equal.addEventListener("click", getResult);

del.addEventListener("click", deleteChar);

aC.addEventListener("click", () => {
    screen.textContent = 0;
    firstNum.length = 0;
    secondNum.length = 0;
    operator.length = 0;
    result = 0;
    point.disabled = false;
})