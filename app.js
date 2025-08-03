const num = Math.floor(Math.random() * 30 + 1);
let numberOfGuesses = 0;
let score = 30;
let time = 0;
let timerInterval;

const input = document.getElementById("guessInput");
const message = document.getElementById("message");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const scoresList = document.getElementById("scoresList");

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
    document.querySelector("button").disabled = true;
  } else if (guess > num) {
    message.textContent = "📈 Too high!";
  } else {
    message.textContent = "📉 Too low!";
  }

  scoreDisplay.textContent = `Score: ${score}`;
  input.value = "";
}

// 🕒 Timer Logic
function startTimer() {
  timerInterval = setInterval(() => {
    time++;
    timerDisplay.textContent = `Time: ${time}s`;
  }, 1000);
}

// 🌙 Theme Toggle
function toggleTheme() {
  document.body.classList.toggle("dark");
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

  // Sort by score descending
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 5); // top 5 scores

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

// 🚀 On Page Load
displayLeaderboard();
startTimer();
initGame(); 
