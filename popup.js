let time = 1500;
const timerElement = document.querySelector("#timer");
let timeToWork = true;
let workInterval;
const buttonStart = document.querySelector(".button");

const decreaseTime = () => {
  // Obtenir les minutes et les secondes
  let minutes = parseInt(time / 60, 10);
  let seconds = parseInt(time % 60, 10);

  // Afficher les deux chiffres des minutes et des secondes
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  timerElement.innerText = `${minutes}:${seconds}`;
  time--;

  if (time < 0) {
    clearInterval(workInterval);
    timeToWork = !timeToWork; // Alterner entre travail et pause
    time = timeToWork ? 1500 : 300; // Repasser à 10 secondes ou 5 secondes
    startTimer();
  }
};

const startTimer = () => {
  workInterval = setInterval(decreaseTime, 1000);
};

// Démarrer automatiquement au chargement
buttonStart.addEventListener("click", startTimer);
