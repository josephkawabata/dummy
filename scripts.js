let correctAnswer;
let operation;
let currentDigits = 'one'; // Default to one digit
let algebraAttributes = []; // Store the selected algebra attributes
let arithmeticType; // Store the current arithmetic type

function selectOperation(op) {
    operation = op;
    document.getElementById('problem-type-choice').style.display = 'none';
    document.getElementById('algebra-text').style.display = 'none';
    document.getElementById('new-problem-button').style.display = 'block';
    document.getElementById('another-one-button').style.display = 'none';

    if (operation === 'algebra') {
        document.getElementById('algebra-choice').style.display = 'flex';
    } else if (operation === 'arithmetic') {
        document.getElementById('arithmetic-choice').style.display = 'flex';
    }
}

function chooseArithmeticType(type) {
    arithmeticType = type;
    document.getElementById('arithmetic-choice').style.display = 'none';
    generateMathProblem(currentDigits);
}

function generateMathProblem(digits) {
    currentDigits = digits;
    let num1 = generateNumber(digits);
    let num2 = generateNumber(digits);
    const mathProblemElement = document.getElementById('math-problem');
    const answerBox = document.getElementById('answer-box');
    const resultElement = document.getElementById('result');
    const submitButton = document.getElementById('submit-button');
    
    // Clear previous problem and result
    answerBox.value = '';
    resultElement.textContent = '';
    answerBox.style.display = 'block';
    submitButton.style.display = 'block';
    answerBox.disabled = false;
    submitButton.disabled = false;
    answerBox.focus(); // Automatically focus on the input box

    if (arithmeticType === 'addition') {
        correctAnswer = num1 + num2;
        mathProblemElement.textContent = `${num1} + ${num2} = ?`;
    } else if (arithmeticType === 'subtraction') {
        // Ensure num1 is greater than num2 for positive result
        if (num1 < num2) [num1, num2] = [num2, num1];
        correctAnswer = num1 - num2;
        mathProblemElement.textContent = `${num1} - ${num2} = ?`;
    }

    // Show the increase/decrease digits button for arithmetic problems
    document.getElementById('choose-digits-button').style.display = 'block';
    document.getElementById('new-problem-button').style.display = 'block';
    document.getElementById('another-one-button').style.display = 'none';
    
    // Hide the digit choice buttons and header
    document.getElementById('digit-choice').style.display = 'none';
}

function generateAlgebraProblem(type) {
    algebraAttributes.push(type); // Add the current algebra type to the selected attributes
    let a = Math.floor(Math.random() * 10);
    let b = Math.floor(Math.random() * 10);
    const mathProblemElement = document.getElementById('math-problem');
    const answerBox = document.getElementById('answer-box');
    const resultElement = document.getElementById('result');
    const submitButton = document.getElementById('submit-button');
    
    // Clear previous problem and result
    answerBox.value = '';
    resultElement.textContent = '';
    answerBox.style.display = 'block';
    submitButton.style.display = 'block';
    answerBox.disabled = false;
    submitButton.disabled = false;
    answerBox.focus(); // Automatically focus on the input box
    
    document.getElementById('algebra-text').style.display = 'block';
    document.getElementById('algebra-choice').style.display = 'none'; // Hide algebra choices

    if (!type || type === 'addition/subtraction') {
        type = Math.random() < 0.5 ? 'addition' : 'subtraction';
    } else if (type === 'multiplication/division') {
        type = Math.random() < 0.5 ? 'multiplication' : 'division';
    }

    if (type === 'addition') {
        correctAnswer = a + b;
        mathProblemElement.textContent = `${a} + ${b} = x`;
    } else if (type === 'subtraction') {
        correctAnswer = a - b;
        mathProblemElement.textContent = `${a} - ${b} = x`;
    } else if (type === 'multiplication') {
        correctAnswer = a * b;
        mathProblemElement.textContent = `${a} * ${b} = x`;
    } else if (type === 'division') {
        // Ensure b is not zero and the division results in a whole number
        if (b === 0) b = 1;
        correctAnswer = a / b;
        mathProblemElement.innerHTML = `<div class="fraction"><span>${a}</span><span class="denominator">${b}</span></div> = x`;
    }
    
    // Hide the increase/decrease digits button for algebra problems
    document.getElementById('choose-digits-button').style.display = 'none';
    document.getElementById('new-problem-button').style.display = 'block';
    document.getElementById('another-one-button').style.display = 'none';
}

function beginAlgebraProblems() {
    algebraAttributes = []; // Reset the selected attributes
    if (document.getElementById('addition-subtraction').checked) {
        algebraAttributes.push('addition/subtraction');
    }
    if (document.getElementById('multiplication-division').checked) {
        algebraAttributes.push('multiplication/division');
    }
    if (algebraAttributes.length > 0) {
        generateCombinedAlgebraProblem();
    }
}

function generateCombinedAlgebraProblem() {
    let types = [];
    algebraAttributes.forEach(attr => {
        if (attr === 'addition/subtraction') {
            types.push(Math.random() < 0.5 ? 'addition' : 'subtraction');
        } else if (attr === 'multiplication/division') {
            types.push(Math.random() < 0.5 ? 'multiplication' : 'division');
        }
    });
    
    let problem = '';
    let correct = 0;
    let a = Math.floor(Math.random() * 10);
    let b = Math.floor(Math.random() * 10);
    let c = Math.floor(Math.random() * 10);
    let operationsCount = Math.floor(Math.random() * 2) + 1; // Generate at most 2 operations

    for (let i = 0; i < operationsCount; i++) {
        let type = types[Math.floor(Math.random() * types.length)];

        if (type === 'addition') {
            problem += `${i > 0 ? ' + ' : ''}${a} + ${b}`;
            correct = i === 0 ? a + b : correct + b;
        } else if (type === 'subtraction') {
            problem += `${i > 0 ? ' - ' : ''}${a} - ${b}`;
            correct = i === 0 ? a - b : correct - b;
        } else if (type === 'multiplication') {
            problem += `${i > 0 ? ' * ' : ''}${a} * ${b}`;
            correct = i === 0 ? a * b : correct * b;
        } else if (type === 'division') {
            if (b === 0) b = 1;
            problem += `${i > 0 ? ' / ' : ''}<div class="fraction"><span>${a}</span><span class="denominator">${b}</span></div>`;
            correct = i === 0 ? a / b : correct / b;
        }

        if (i < operationsCount - 1) {
            a = c; // Use c for next operation if more than one type is selected
            b = Math.floor(Math.random() * 10);
            c = Math.floor(Math.random() * 10);
        }
    }
    
    const mathProblemElement = document.getElementById('math-problem');
    mathProblemElement.innerHTML = `${problem} = x`;
    correctAnswer = correct;
    
    // Display the answer input box and submit button
    const answerBox = document.getElementById('answer-box');
    const submitButton = document.getElementById('submit-button');
    answerBox.style.display = 'block';
    submitButton.style.display = 'block';
    answerBox.disabled = false;
    submitButton.disabled = false;
    answerBox.value = ''; // Clear the input box
    answerBox.focus();
}

function generateNumber(digits) {
    if (digits === 'one') {
        return Math.floor(Math.random() * 10);
    } else if (digits === 'two') {
        return Math.floor(Math.random() * 90) + 10; // Two-digit number between 10 and 99
    } else if (digits === 'three') {
        return Math.floor(Math.random() * 900) + 100; // Three-digit number between 100 and 999
    }
}

function checkAnswer() {
    const answerBox = document.getElementById('answer-box');
    const userAnswer = parseFraction(answerBox.value.trim());
    const resultElement = document.getElementById('result');
    
    if (userAnswer === correctAnswer) {
        resultElement.textContent = 'Correct!';
        resultElement.style.color = 'green';
    } else {
        resultElement.textContent = `Incorrect. The correct answer was ${correctAnswer}.`;
        resultElement.style.color = 'red';
    }
    
    // Disable the input and submit button to prevent further input
    answerBox.disabled = true;
    document.getElementById('submit-button').disabled = true;
    
    // Show the new problem and another one button to allow the user to reset the form
    document.getElementById('new-problem-button').style.display = 'block';
    document.getElementById('another-one-button').style.display = 'block';
    if (operation === 'arithmetic') {
        document.getElementById('choose-digits-button').style.display = 'block';
    }
}

function parseFraction(fraction) {
    if (fraction.includes('/')) {
        const [numerator, denominator] = fraction.split('/');
        return parseFloat(numerator) / parseFloat(denominator);
    }
    return parseFloat(fraction);
}

function showDigitChoice() {
    document.getElementById('digit-choice').style.display = 'block';
    document.getElementById('digit-choice-header').style.display = 'block';
}

function generateAnotherOne() {
    if (operation === 'algebra') {
        document.getElementById('result').textContent = ''; // Clear the result text
        generateCombinedAlgebraProblem(); // Generate a combined algebra problem
    } else if (operation === 'arithmetic') {
        document.getElementById('result').textContent = ''; // Clear the result text
        generateMathProblem(currentDigits); // Use the stored arithmetic type to generate a new problem
    }
}

function resetSelection() {
    location.reload(); // Reload the page to reset everything
}

function navigateButtons(event) {
    const buttons = Array.from(document.querySelectorAll('button:visible'));
    let currentIndex = buttons.indexOf(document.activeElement);
    if (event.key === 'ArrowDown') {
        currentIndex = (currentIndex + 1) % buttons.length;
        buttons[currentIndex].focus();
    } else if (event.key === 'ArrowUp') {
        currentIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        buttons[currentIndex].focus();
    }
}
