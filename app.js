const cookieBtn = document.getElementById("cookieBtn");
const clickCountElement = document.getElementById("clickCount");
const machineCountElement = document.getElementById("MachineCount");
const messageElement = document.getElementById("message");


let count = 0;
let cookiesMachine = 0;
let Start = false;
let intervalTime = 1000; // Starting with a 1-second interval
let i = 1; // To store the interval ID for the machine
let intervalId; 
// let specialMode = false;

let buttonStates = {
    Btn1: false,
    Btn2: false,
    Btn3: false,
    Btn4: false
};



let scores = JSON.parse(localStorage.getItem('gameScores')) || { playerWins: 0, machineWins: 0 };
updateScoreDisplay(); // Call this when the script loads
function updateLocalStorageScores() {
    localStorage.setItem('gameScores', JSON.stringify(scores));
}


document.getElementById("Btn1").addEventListener("click", () => setActiveButton('Btn1'));
document.getElementById("Btn2").addEventListener("click", () => setActiveButton('Btn2'));
document.getElementById("Btn3").addEventListener("click", () => setActiveButton('Btn3'));
document.getElementById("Btn4").addEventListener("click", () => setActiveButton('Btn4'));


function incrementCount() {
      // Incrementing count based on conditions
      if (buttonStates.Btn1) {
        count += 10;
    } else if (buttonStates.Btn2) {
        count += 50;
    } else if (buttonStates.Btn3) {
        count += 100;
    } else if (buttonStates.Btn4) {
        count += 500; // Assuming you want a different value for Btn4
    } else {
        count++;
    }
    clickCountElement.textContent = count;

    if (count >= 10) {
        document.getElementById("Btn1").style.display = 'block';
    } 
    if (count >= 50) {
        document.getElementById("Btn2").style.display = 'block';
    }
    if (count >= 1000) {
        document.getElementById("Btn3").style.display = 'block';
    }
    if (count >= 1500) {
        document.getElementById("Btn4").style.display = 'block';
    }

    // Check if either count or cookiesMachine reaches 9999
    if (count >= 2999) {
        messageElement.textContent = "You won!";
        createCookieRain();
        clearInterval(intervalId);
        clearInterval(i);
        cookieBtn.removeEventListener("click", incrementCount);
        scores.playerWins += 1; // Increment player's win count
        updateLocalStorageScores(); // Update local storage
        updateScoreDisplay();



    }

    // Start the interval only once
    if (!Start) {
        Start = true;
        starti();
        startMachine();
    }
}

function starti() {
    i = setInterval(function() {
        i = i * 10;
        console.log(i);
    }, 1500);
}

function startMachine() {
    let j = intervalTime / i;
    intervalId = setTimeout(function() {
        cookiesMachine = cookiesMachine + 1;
        machineCountElement.textContent = cookiesMachine;
        startMachine(); // Recursively call startMachine
    }, j);


    if (cookiesMachine >= 2999) {
        messageElement.textContent = "Machine wins!";
        createCookieRain();
        clearInterval(intervalId);
        clearInterval(i);
        cookieBtn.removeEventListener("click", incrementCount);
        scores.machineWins += 1; // Increment machine's win count
        updateLocalStorageScores(); // Update local storage
        updateScoreDisplay();

    }
}

function setActiveButton(buttonId) {
    // Set all buttons to false
    for (let key in buttonStates) {
        buttonStates[key] = false;
    }

    // Set the clicked button to true
    buttonStates[buttonId] = true;

    // Remove active class from all buttons
    document.querySelectorAll('button').forEach(button => {
        button.classList.remove('active-button');
    });

    // Add active class to the clicked button
    document.getElementById(buttonId).classList.add('active-button');
}



// function onSpecialButtonClick() {
//     specialMode = true; // Enable special mode
// }


cookieBtn.addEventListener("click", incrementCount);

function updateScoreDisplay() {
    const playerScoreElement = document.getElementById("playerScore");
    const machineScoreElement = document.getElementById("machineScore");

    playerScoreElement.textContent = `Player Wins: ${scores.playerWins}`;
    machineScoreElement.textContent = `Machine Wins: ${scores.machineWins}`;
}

function createCookieRain() {
    for (let i = 0; i < 20; i++) { // Number of cookies
        const cookie = document.createElement('div');
        cookie.classList.add('cookie');
        cookie.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
        cookie.style.animationDuration = Math.random() * 3 + 2 + 's'; // Random animation duration
        cookie.style.animationDelay = Math.random() * 0.5 + 's'; // Random delay
        document.body.appendChild(cookie);
    }
}


