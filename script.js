let timer;
let seconds = 0;
let isRunning = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');

function formatTime(s) {
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    display.textContent = formatTime(seconds);
}

function addLap() {
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter++}: ${formatTime(seconds)}`;
    lapsList.appendChild(lapItem);
}

startPauseBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        startPauseBtn.textContent = 'Start';
        lapBtn.disabled = true;
    } else {
        isRunning = true;
        timer = setInterval(() => {
            seconds++;
            updateDisplay();
        }, 1000);
        startPauseBtn.textContent = 'Pause';
        lapBtn.disabled = false;
        resetBtn.disabled = false;
    }
});

lapBtn.addEventListener('click', () => {
    addLap();
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    seconds = 0;
    lapCounter = 1;
    isRunning = false;
    updateDisplay();
    lapsList.innerHTML = ''; // Clear lap times
    startPauseBtn.textContent = 'Start';
    lapBtn.disabled = true;
    resetBtn.disabled = true;
});

updateDisplay(); // Initialize the display with 00:00:00
