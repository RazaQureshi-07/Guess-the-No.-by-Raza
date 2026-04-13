let num = Math.floor(Math.random() * 30 + 1);
// console.log(num);
let numberOfGuesses = 0;
let score = 30;
let time = 0;
let timerInterval;

const input = document.getElementById("guessInput");
const message = document.getElementById("message");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const scoresList = document.getElementById("scoresList");
const submitBtn = document.getElementById("submitBtn")
const restartBtn = document.getElementById("restartBtn");

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    checkGuess();
  }
});

function checkGuess() {
  const guess = parseInt(input.value);

  if (isNaN(guess) || guess < 1 || guess > 30) {
    message.textContent = "Enter a valid number between 1 and 30";
    return;
  }

  numberOfGuesses++;
  score--;

  if (guess === num) {
    clearInterval(timerInterval);
    message.textContent = `🎉 Correct! You guessed it in ${numberOfGuesses} attempts and ${time}s`;
    message.style.color = 'green';
    message.style.fontWeight = "bold";
    scoreDisplay.textContent = `Final Score: ${score}`;
    saveToLeaderboard(score, time);
    input.disabled = true;
    submitBtn.disabled = true;
    restartBtn.style.display = "inline-block"
  }
  else if (Math.abs(guess - num) <= 2) {
    message.textContent = "🔥 Very close!";
    message.style.color = "orange";

  } else if (guess > num) {
    message.textContent = "Too high!";
    message.style.color = 'red';
    message.style.fontWeight = "bold";
  } else {
    message.textContent = "Too low!";
    message.style.color = 'red';
    message.style.fontWeight = "bold";
  }

  scoreDisplay.textContent = `Score: ${score}`;
  input.value = "";
}

// initialize game
function initGame() {
  num = Math.floor(Math.random() * 30 + 1);
  numberOfGuesses = 0;
  time = 0;
  score = 30;
  input.disabled = false;
  submitBtn.disabled = false
  input.value = "";
  restartBtn.style.display = "none";
  message.textContent = "";
  scoreDisplay.textContent = `Score: ${score}`;
  timerDisplay.textContent = `Time 0s`;
  clearInterval(timerInterval);
  startTimer();
}

// timer logic
function startTimer() {
  timerInterval = setInterval(() => {
    time++;
    timerDisplay.textContent = `Time: ${time}s`;
  }, 1000);
}

// theme toggle
function toggleTheme() {
  document.body.classList.toggle("dark");
}

// restart button logic
function restartGame() {
  initGame();
}

// leaderboard logic
function saveToLeaderboard(score, time) {
  const entry = {
    score,
    time,
    date: new Date().toLocaleString()
  };

  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push(entry);

  // sort by score descending
  leaderboard.sort((a, b) => {
  if (b.score === a.score) {
    return a.time - b.time; // kam time wala winner
  }
  return b.score - a.score;
});
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

// on page load
displayLeaderboard();
initGame(); 
