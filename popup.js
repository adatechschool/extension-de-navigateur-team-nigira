const workSessionDuration = document.querySelector('#workTime')
const breakDuration = document.querySelector('#breakTime')
const usersInput = document.querySelector("#usersInput")
let time = breakDuration.value;
let timeToWork = true;
let workInterval;
const timerElement = document.querySelector("#timer");
const buttonStart = document.querySelector("#buttonStart");
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
    time = timeToWork ? workSessionDuration.value : breakDuration.value; // Repasser à 10 secondes ou 5 secondes
  }
}

const startTimer = () => {
    clearInterval(workInterval);
    timeToWork = true;
    time = workSessionDuration.value;
    decreaseTime();
    workInterval = setInterval(decreaseTime, 1000);
};

// Démarrer automatiquement au chargement
buttonStart.addEventListener("click", () =>{
    startTimer()
    buttonEnd.style.display = "block"
    buttonStart.style.display = "none"
    usersInput.innerHTML= ""
})

buttonEnd.addEventListener('click', endTimer)

function endTimer (){
    clearInterval(workInterval)
    timerElement.innerText = ``;
    buttonEnd.style.display = "none"
    buttonStart.style.display = "block"
    usersInput.innerHTML = `
    <label for="workTime">Choisissez l'heure travail (min)</label>
    <input 
        type="number" 
        id="workTime"
        min="0">
    <label for="breakTime">Choisissez l'heure pause (min)</label>
    <input 
        type="number" 
        id="breakTime"
        min="0">
`
}