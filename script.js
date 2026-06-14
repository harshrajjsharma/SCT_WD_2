// Get DOM elements
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

// Variables to track time
let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime = 0;
let running = false;
let lapCounter = 1;

// Start Button Logic
startBtn.addEventListener('click', () => {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 10); // Run getShowTime every 10ms
        running = true;
    }
});

// Pause Button Logic
pauseBtn.addEventListener('click', () => {
    if (running) {
        clearInterval(tInterval); // Stop the interval
        savedTime = difference; // Save the time so we don't start from zero
        running = false;
    }
});

// Reset Button Logic
resetBtn.addEventListener('click', () => {
    clearInterval(tInterval);
    savedTime = 0;
    running = false;
    display.innerHTML = "00:00:00.00";
    lapsList.innerHTML = ""; // Clear the lap list
    lapCounter = 1;
});

// Lap Button Logic
lapBtn.addEventListener('click', () => {
    if (running) {
        const li = document.createElement('li');
        li.innerHTML = `<span>Lap ${lapCounter}</span> <span>${display.innerHTML}</span>`;
        lapsList.prepend(li); // Puts the newest lap at the top of the list
        lapCounter++;
    }
});

// The Core Math Function
function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime + savedTime;

    // Math to convert milliseconds into hours, minutes, seconds, and hundredths
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    // Add leading zeros if the number is less than 10
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    // Update the display
    display.innerHTML = hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}