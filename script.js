//render the track again with the new position

const startBtn = document.getElementById("startBtn");
const messageE1 = document.getElementById("message");
const trackE1 = document.getElementById("track");

const TRACK_LENGTH = 70;

let tortoisePosition = 1;
let harePosition = 1;
let raceIntervalId = null;

startBtn.addEventListener("click", startRace);
//start the race with a click button
function startRace() {
    tortoisePosition = 1;
    harePosition = 1;

    messageE1.textContent = "BANG!!! AND THEY ARE OFF!!!";
    // disable the start button after you click it
    startBtn.disabled = true;
    //avoid double races
    if (raceIntervalId !== null) {
        clearInterval(raceIntervalId);
    }
    //trigger the tortoise and hare every second
    //run a race step every one second
    raceIntervalId = setInterval(raceStep, 1000);
}

function raceStep() {
    moveTortoise(); //move the tortoise randomly
    moveHare(); //move the hare randomly
    clampPosition(); //fix the position if they go beyond the race track
    renderTrack(); //render the track again with the new position

    //check finish
    if (tortoisePosition >= TRACK_LENGTH || harePosition >= TRACK_LENGTH) {
        clearInterval(raceIntervalId);
        raceIntervalId = null;
        startBtn.disabled = false;
        showResult();
    }
}

function moveTortoise() {
    //random integer 1-10
    let roll = Math.floor(Math.random() * 10) + 1;
    if (roll >= 1 && roll <= 5) {
        //1-5 fast plod
        tortoisePosition += 4;
    } else if (roll >= 6 && roll <= 7) {
        //6-7 slip
        tortoisePosition -= 5;
    } else {
        //8-10 slow
        tortoisePosition += 1;
    }
}

function moveHare() {
    //random integer 1-10
    let roll = Math.floor(Math.random() * 10) + 1;
    if (roll >= 1 && roll <= 3) {
        //1-3 relaxing
        harePosition -= 8;
    } else if (roll >= 4 && roll <= 7) {
        //4-7 small hop
        harePosition += 2;
    } else {
        //7-10 BIG HOP
        harePosition += 3;
    }
}

function clampPosition() {
    //fix the position if they go beyond the race track
    const MIN_POSITION = 1;
    const MAX_POSITION = TRACK_LENGTH;

    tortoisePosition = Math.min(
        MAX_POSITION,
        Math.max(MIN_POSITION, tortoisePosition),
    );

    harePosition = Math.min(MAX_POSITION, Math.max(MIN_POSITION, harePosition));
}

//render the track with tortise and hare emojis
function renderTrack() {
    trackE1.innerHTML = ``;

    for (let i = 1; i <= TRACK_LENGTH; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        const isTortoiseHere = tortoisePosition === i;
        const isHareHere = harePosition === i;

        if (isTortoiseHere && isHareHere) {
            cell.textContent = "💥";
            cell.classList.add("both");
        } else if (isTortoiseHere) {
            cell.textContent = "🐢";
            cell.classList.add("tortoise");
        } else if (isHareHere) {
            cell.textContent = "🐇";
            cell.classList.add("hare");
        }

        trackE1.appendChild(cell);
    }
}

//when one of the animals reach the end of the track, show results
function showResult() {
    if (tortoisePosition >= TRACK_LENGTH && harePosition >= TRACK_LENGTH) {
        messageE1.textContent = "It's a tie!";
    } else if (tortoisePosition >= TRACK_LENGTH) {
        messageE1.textContent = "TORTOISE WINS!!!";
    } else if (harePosition >= TRACK_LENGTH) {
        messageE1.textContent = "HARE WINS !!!";
    } else {
        messageE1.textContent = "Race stopped!";
    }
}

renderTrack();

//Add scoreboard
const scoreBoard = document.createElement("scoreBoard");
trackE1.before(scoreBoard);

//use if condition to check who has the highest score
let tortoiseScore = 0;
let hareScore = 0;
let draw = 0;

function showScore(highestScore) {
    if (highestScore === "tortoiseScore") {
        tortoiseScore++;
    } else if (highestScore === "hareScore") {
        hareScore++;
    } else highestScore === "Draw";
    draw;
}

// show the scoreboard in html
scoreBoard.innerHTML = `
<h2> ScoreBoard </h2>
<p> 🐢: ${tortoiseScore} </p> 
<p> 🐇: ${hareScore} </p>`;

showScore();
