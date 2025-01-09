const workSessionDuration = document.querySelector("#workTime");
const breakDuration = document.querySelector("#breakTime");
const usersInput = document.querySelector("#usersInput");
let time = breakDuration.value;
let timeToWork = true;
let workInterval;
const timerElement = document.querySelector("#timer");
const buttonStart = document.querySelector("#buttonStart");
const buttonEnd = document.querySelector("#buttonEnd");

const musicCheckbox = document.querySelector("#musicCheckbox");
const audioPlayer = document.querySelector("#audioPlayer");

const decreaseTime = () => {
  // Obtenir les minutes et les secondes
  let minutes = parseInt(time / 60, 10);
  let seconds = parseInt(time % 60, 10);

  // Afficher les deux chiffres des minutes et des secondes
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  timerElement.innerText = `${minutes}:${seconds}`;
  time--;
  //a voir pour alterner les Audio de RAISSA
  if (time < 0) {
    timeToWork = !timeToWork; // Alterner entre travail et pause
    timeToWork ? workSessionDuration.value : breakDuration.value; // Repasser à 10 secondes ou 5 seconde
    timeToWork ? playSoundWork() : playSoundBreak()
    if (timeToWork) {
      time = workSessionDuration.value;
      if (musicCheckbox.checked) {
        audioPlayer.play();
      }
    } else {
      time = breakDuration.value; // Repasser à la pause
      audioPlayer.pause(); // Arrêter la musique pendant la pause
      audioPlayer.currentTime = 0; // Réinitialiser la position de la musiq
    }
    decreaseTime();
  }
};

const startTimer = () => {
  clearInterval(workInterval);
  timeToWork = true;
  time = workSessionDuration.value;
  if (musicCheckbox.checked) {
    audioPlayer.play();
  }
  decreaseTime();
  workInterval = setInterval(decreaseTime, 1000);
};

// Démarrer automatiquement au chargement
buttonStart.addEventListener("click", () => {
  startTimer();
  buttonEnd.style.display = "block";
  buttonStart.style.display = "none";
  usersInput.innerHTML = "";
  if (timeToWork && musicCheckbox.checked) {
    audioPlayer.play();
  } else {
    audioPlayer.pause();
    audioPlayer.currentTime = 0; //reinitialise la position de la misique au debut de la lécture
  }
});

buttonEnd.addEventListener("click", endTimer);

function endTimer() {
  clearInterval(workInterval);
  timerElement.innerText = ``;
  buttonEnd.style.display = "none";
  buttonStart.style.display = "block";
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
`;
  audioPlayer.pause(); // Mettre en pause la musique
  audioPlayer.currentTime = 0;
}

const goTobreak = [
  '/audios/Audio_giau_pause.mp3',
  '/audios/Audio_nico_pause.mp3',
  '/audios/Audio_Raissa_pause.mp3'
];

const goToWork = [
  '/audios/Audio_giau_taff.mp3',
  '/audios/Audio_nico_taff.mp3',
  '/audios/Audio_Raissa_taff.mp3'
]


const playSoundBreak = () => {

    const audioIndex = Math.floor(Math.random() * goTobreak.length);
    const audioPath = chrome.runtime.getURL(goTobreak[audioIndex]);
    console.log('audio path:', audioPath)
    audio = new Audio(audioPath)

  return audio.play()
}

const playSoundWork = () => {
  const audioIndex = Math.floor(Math.random() * goToWork.length);
  const audioPath = chrome.runtime.getURL(goToWork[audioIndex]);
  console.log('audio path WORK:', audioPath)
  audio = new Audio(audioPath)

return audio.play()
}
