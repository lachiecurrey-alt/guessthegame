document.addEventListener("DOMContentLoaded", () => {
  if (!Array.isArray(games) || games.length === 0) {
    alert("No games found!");
    return;
  }

  if (sessionStorage.getItem("gameStarted") !== "true") {
    alert("You must start the game first!");
    window.location.href = "start.html";
    return;
  }

  let secretGame = games[Math.floor(Math.random() * games.length)];
  let questionsAsked = 0;

  const logUL = document.getElementById("log");

  function log(msg) {
    const li = document.createElement("li");
    li.textContent = msg;
    logUL.appendChild(li);
    logUL.scrollTop = logUL.scrollHeight;
  }

  window.askQuestion = function() {
    const q = document.getElementById("questionSelect").value;
    questionsAsked++;

    let answer = "No";
    if (q === "multiplayer") answer = secretGame.multiplayer ? "Yes" : "No";
    else if (q === "mobile") answer = (secretGame.platforms.ios || secretGame.platforms.android) ? "Yes" : "No";
    else if (q === "console") answer = (secretGame.platforms.xbox || secretGame.platforms.playstation || secretGame.platforms.switch) ? "Yes" : "No";
    else if (secretGame.platforms[q]) answer = "Yes";

    log(`❓ Q${questionsAsked}: ${q} → ${answer}`);
  };

  window.makeGuess = function() {
    const guessInput = document.getElementById("guessInput");
    const guess = guessInput.value.trim();
    if (!guess) return;
    guessInput.value = "";

    if (guess.toLowerCase() === secretGame.name.toLowerCase()) {
      log(`✅ CORRECT! It was 🎉 ${secretGame.name}`);
      log(`🏆 You won in ${questionsAsked} questions`);
      sessionStorage.removeItem("gameStarted");
    } else {
      log(`❌ Guess: ${guess}`);
    }
  };

  window.giveUp = function() {
    log(`🏳️ Gave up! The game was 🎯 ${secretGame.name}`);
    log(`Questions asked: ${questionsAsked}`);
    sessionStorage.removeItem("gameStarted");
  };

  log("🎮 Game started! Ask yes/no questions.");
});
