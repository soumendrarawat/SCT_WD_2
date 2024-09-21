let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById("display");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapList = document.getElementById("lapList");

function startStopwatch() {
    if (!running) {
        if (!startTime) {
            startTime = new Date().getTime();
        } else {
            startTime += new Date().getTime() - updatedTime;
        }
        tInterval = setInterval(updateTime, 10); // Update every 10 milliseconds for ms
        running = true;
        startStopButton.innerText = "Pause";
    }
}

function pauseStopwatch() {
    if (running) {
        updatedTime = new Date().getTime();
        clearInterval(tInterval); // Stop updating
        running = false;
        startStopButton.innerText = "Start";
    }
}

function resetStopwatch() {
    clearInterval(tInterval); // Stop the timer
    running = false;
    startTime = null; // Reset all variables
    lapCounter = 1;
    display.innerText = "00:00:000"; // Reset display to minutes:seconds:milliseconds
    lapList.innerHTML = ""; // Clear laps
    startStopButton.innerText = "Start"; // Reset button text
}

function updateTime() {
    let currentTime = new Date().getTime();
    difference = currentTime - startTime;

    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)); // Minutes
    let seconds = Math.floor((difference % (1000 * 60)) / 1000); // Seconds
    let milliseconds = Math.floor((difference % 1000) / 10); // Milliseconds

    display.innerText =
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + ":" +
        (milliseconds < 10 ? "0" + milliseconds : milliseconds); // Format M:S:ms
}

function recordLap() {
    if (running) {
        const lapTime = display.innerText;
        const lapItem = document.createElement("li");
        lapItem.innerText = "Lap " + lapCounter + ": " + lapTime;
        lapList.appendChild(lapItem);
        lapCounter++;
    }
}

startStopButton.addEventListener("click", () => {
    if (!running) {
        startStopwatch();
    } else {
        pauseStopwatch();
    }
});

resetButton.addEventListener("click", resetStopwatch);

lapButton.addEventListener("click", recordLap);