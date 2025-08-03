const numDisplay = document.getElementById("numDisplay"); // Optional if you want to show number
const input = document.getElementById("guessInput");
const message = document.getElementById("message");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const scoresList = document.getElementById("scoresList");
const restartBtn = document.getElementById("restartBtn");

let num;
let numberOfGuesses;
let score;
let time;
let timerInterval;

function initGame() {
  num = Math.floor(Math.random() * 30 + 1);
  numberOfGuesses = 0;
  score = 30;
  time = 0;
  input.disabled = false;
  document.querySelector("button[onclick='checkGuess()']").disabled = false;
  restartBtn.style.display = "none";
  input.value = "";
  message.textContent = "";
  scoreDisplay.textContent = `Score: ${score}`;
  timerDisplay.textContent = `Time: 0s`;
  clearInterval(timerInterval);
  startTimer();
}

function checkGuess() {
  const guess = parseInt(input.value);
  if (isNaN(guess) || guess < 1 || guess > 30) {
    message.textContent = "❌ Enter a valid number between 1 and 30";
    return;
  }

  numberOfGuesses++;
  score--;

  if (guess === num) {
    clearInterval(timerInterval);
    message.textContent = `🎉 Correct! You guessed it in ${numberOfGuesses} attempts and ${time}s`;
    scoreDisplay.textContent = `Final Score: ${score}`;
    saveToLeaderboard(score, time);
    input.disabled = true;
    document.querySelector("button[onclick='checkGuess()']").disabled = true;
    restartBtn.style.display = "inline-block";
  } else if (guess > num) {
    message.textContent = "📈 Too high!";
  } else {
    message.textContent = "📉 Too low!";
  }

  scoreDisplay.textContent = `Score: ${score}`;
  input.value = "";
}

// 🕒 Timer
function startTimer() {
  timerInterval = setInterval(() => {
    time++;
    timerDisplay.textContent = `Time: ${time}s`;
  }, 1000);
}

// 🔁 Restart Button Logic
function restartGame() {
  initGame();
}

// 🏆 Leaderboard Logic
function saveToLeaderboard(score, time) {
  const entry = {
    score,
    time,
    date: new Date().toLocaleString()
  };
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push(entry);
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 5);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  displayLeaderboard();
}

function displayLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  scoresList.innerHTML = "";
  leaderboard.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = `Score: ${entry.score} | Time: ${entry.time}s | ${entry.date}`;
    scoresList.appendChild(li);
  });
}

// 🚀 On page load
displayLeaderboard();
initGame();






// video 22 Exercise 1
/*
const num = Math.floor(Math.random() * 100 + 1);
// console.log(num);
let userGuess;
let numberOfGuesses = 0;
while (true) {
  userGuess = parseInt(prompt("Enter your guess number"));
  numberOfGuesses++;

  if (userGuess === num) {
    alert("You win the game");
    break;
  } else if (userGuess > num) {
    alert("Your guess is greater than a number");
  } else if (userGuess < num) {
    alert("Your guess is less than a number");
  } else {
    alert("please! Enter a valid number");
    numberOfGuesses--;
  }
}
let score = 100 - numberOfGuesses;
alert(`Your score is ${score}`);
*/