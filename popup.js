import { addTask } from "./js/todo/task.js";
import { containerTask, inputEntry, add, tasksList } from "./js/todo/variableTodo.js";
import { goToWork, goTobreak, playSound } from "./js/pomodoro/sound.js";


const usersInput = document.querySelector("#usersInput");
const timerElement = document.querySelector("#timer");
const buttonStart = document.querySelector("#buttonStart");
const buttonEnd = document.querySelector("#buttonEnd");
const musicCheckbox = document.querySelector("#musicCheckbox");
const audioPlayer = document.querySelector("#audioPlayer");
const musicBox = document.querySelector("#musicBox")

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
  //a voir pour alterner les Audio de RAISSA
  if (time < 0) {
    timeToWork = !timeToWork; // Alterner entre travail et pause
    // time = timeToWork ? workSessionDuration : breakDuration; // Repasser à 10 secondes ou 5 seconde
    timeToWork ? playSound(goToWork) : playSound(goTobreak)
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

//Statut de bouton Start
document.querySelector("#workTime").addEventListener("change", () => {
  updateStartButtonState()
})
document.querySelector("#breakTime").addEventListener("change", () => {
  updateStartButtonState()
})

function updateStartButtonState() {
  workSessionDuration = document.querySelector("#workTime").value;
  breakDuration = document.querySelector("#breakTime").value;
  if (workSessionDuration < 1 || breakDuration < 1) {
    buttonStart.disabled = true;
  } else {
    buttonStart.disabled = false;
  }
}
updateStartButtonState()

// Démarrer automatiquement au chargement
buttonStart.addEventListener("click", () => {
  workSessionDuration = document.querySelector("#workTime").value;
  breakDuration = document.querySelector("#breakTime").value;
  startTimer();
  buttonEnd.style.display = "block";
  buttonStart.style.display = "none";
  usersInput.innerHTML = "";
  musicBox.innerHTML = ""
  if (timeToWork && musicCheckbox.checked) {
    audioPlayer.play();
  } else {
    audioPlayer.pause();
    audioPlayer.currentTime = 0; //reinitialise la position de la misique au debut de la lécture
  }
});

buttonEnd.addEventListener("click", endTimer);

function endTimer() {
  breakDuration = ""
  workSessionDuration = ""
  clearInterval(workInterval);
  timerElement.innerText = ``;
  buttonEnd.style.display = "none";
  buttonStart.style.display = "block";
  usersInput.innerHTML = `
    <label for="workTime">Choisissez votre temps de travail</label>
    <input 
        type="number" 
        id="workTime"
        min="0">
    <label for="breakTime">Choisissez votre temps de pause</label>
    <input 
        type="number" 
        id="breakTime"
        min="0">
`;
musicBox.innerHTML= `
<label>
  <input type="checkbox" id="musicCheckbox" />
  Activer la musique
</label>
`
  audioPlayer.pause(); // Mettre en pause la musique
  audioPlayer.currentTime = 0;
}

const createTaskInput = () => {
  containerTask.style.display = 'block';
  inputEntry.focus()
}

let taskIndexes = new Set()
let taskIndex = 1
const createTask = (taskName) => {
  addTask(taskName)

  // création de la tâche
  const task = document.createElement('li');
  task.id = `task${taskIndex}`
  task.classList.add('task');
  //task.innerText = taskName

  const checkbox = document.createElement('input');
  checkbox.type = "checkbox"

  const label = document.createElement('label');
  label.innerText = taskName

  const button = document.createElement('button');
  button.id = `delete${taskIndex}`
  button.classList.add("buttonPoubelle")
  button.innerHTML += `<img src="icons/poubelle.png">`

  task.appendChild(checkbox)
  task.appendChild(label)
  task.appendChild(button)

  // création de l'input lors du doubleClick
  label.addEventListener('dblclick', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = label.innerText;

    // ajouter la tâche avec entrer
    input.addEventListener('keypress', (event) => {
      if(event.key === 'Enter'){
        label.innerHTML = input.value;
      }
    });
    label.innerHTML = '';
    label.appendChild(input);
    input.focus();
  });
  tasksList.appendChild(task)
  taskIndexes.add(taskIndex)

  taskIndexes.forEach((index) => {
    document.querySelector(`#delete${index}`).addEventListener('click', () => {
      document.querySelector(`#task${index}`).remove()
      taskIndexes.delete(index)
    });
  })

  taskIndex++
}


buttonAdd.addEventListener('click', createTaskInput);

inputEntry.addEventListener('keypress', (e) => {
  if(e.key === 'Enter' && inputEntry.value !== ''){
    createTask(inputEntry.value);
    inputEntry.value = '';
    containerTask.style.display + 'none'
  }
});


// CHROME STORAGE AU MOMENT OU LES VALEURS SONT RECUPERER
// CHROME TABS ?
// tabs query et ne rien mettre sur les accolades
// chrome scripting excutescript
// boucler sur toute les pages valides
