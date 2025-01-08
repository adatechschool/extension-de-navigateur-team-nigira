const workSessionDuration = 10
const breakDuration = 5
let time = 5;
let timeToWork = true;
let workInterval;
const timerElement = document.querySelector("#timer");
const buttonStart = document.querySelector(".button");
const buttonEnd = document.querySelector("#buttonEnd")

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
    timeToWork = !timeToWork; // Alterner entre travail et pause
    time = timeToWork ? workSessionDuration : breakDuration; // Repasser à 10 secondes ou 5 secondes
  }
}

const startTimer = () => {
    clearInterval(workInterval);
    timeToWork = true;
    time = workSessionDuration;
    decreaseTime();
    workInterval = setInterval(decreaseTime, 1000);
};

// Démarrer automatiquement au chargement
buttonStart.addEventListener("click", () => {
    startTimer()
    buttonEnd.style.display = "block"
    buttonStart.style.display = "none"
});

buttonEnd.addEventListener('click', () => {
    clearInterval(workInterval)
    timerElement.innerText = ``;
    buttonEnd.style.display = "none"
    buttonStart.style.display = "block"

})
