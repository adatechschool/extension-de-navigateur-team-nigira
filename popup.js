//import { addTask } from "./js/todo/task.js";
import { containerTask, inputEntry, buttonAdd } from "./js/todo/variableTodo.js";
import {  timerElement, buttonStart, buttonEnd , musicCheckbox, audioPlayer, containerInput, containerMusicBox } from "./js/pomodoro/variable.js";
import { playSound, goToWork, goTobreak } from "./js/pomodoro/sound.js";
import { createTask, createTaskInput } from "./js/todo/task.js"


let workSessionDuration = "";
let breakDuration = "";
let time = breakDuration;
let timeToWork = true;
let workInterval;

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
    timeToWork ? playSound(goToWork) : playSound(goTobreak);
    if (timeToWork) {
      time = workSessionDuration;
      if (musicCheckbox.checked) {
        audioPlayer.play();
      }
    } else {
      time = breakDuration; // Repasser à la pause
      audioPlayer.pause(); // Arrêter la musique pendant la pause
      audioPlayer.currentTime = 0; // Réinitialiser la position de la musiq
    }
  }
};

// Démarrer le minuteur du pomodoro
const startTimer = () => {
  clearInterval(workInterval);
  timeToWork = true;
  time = workSessionDuration;
  if (musicCheckbox.checked) {
    audioPlayer.play();
  }
  decreaseTime();
  workInterval = setInterval(decreaseTime, 1000);
};

function updateStartButtonState() {
  workSessionDuration = document.querySelector("#workTime").value;
  breakDuration = document.querySelector("#breakTime").value;
  if (workSessionDuration < 1 || breakDuration < 1) {
    buttonStart.disabled = true;
  } else {
    buttonStart.disabled = false;
  }
}

const start = () => {
  workSessionDuration = document.querySelector("#workTime").value;
  breakDuration = document.querySelector("#breakTime").value;
  startTimer();
  buttonEnd.style.display = "block";
  buttonStart.style.display = "none";
  containerInput.style.display = "none";
  containerMusicBox.style.display = "none";
  if (timeToWork && musicCheckbox.checked) {
    audioPlayer.play();
  } else {
    audioPlayer.pause();
    audioPlayer.currentTime = 0; //reinitialise la position de la musique au debut de la lécture
  }
};

function endTimer() {
  breakDuration = "";
  workSessionDuration = "";
  clearInterval(workInterval);
  timerElement.innerText = ``;
  buttonEnd.style.display = "none";
  buttonStart.style.display = "block";
  containerInput.style.display = "block";
  containerMusicBox.style.display = "block";
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
}

//Statut de bouton Start
document.querySelector("#workTime").addEventListener("change", updateStartButtonState);
document.querySelector("#breakTime").addEventListener("change", updateStartButtonState);

// Evenement lié au bouton start et end
buttonStart.addEventListener("click", start);
buttonEnd.addEventListener("click", endTimer);

// Evenement lié à la todo list 
//buttonAdd.addEventListener('click', createTaskInput);
inputEntry.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && inputEntry.value !== '') {
    createTask(inputEntry.value);
    inputEntry.value = "";
    containerTask.style.display + "none";
  }
});
buttonAdd.addEventListener('click', ()=>{
  createTask(inputEntry.value);
  inputEntry.value = "";
  containerTask.style.display + "none";
})
// Evenement lié à la météo
const bouton = document.querySelector("#bouton");
bouton.addEventListener("click", () => {
  tempExterieur(inputCity.value);
});
