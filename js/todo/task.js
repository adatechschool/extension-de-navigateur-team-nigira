import { tasksList, inputEntry } from "./variableTodo.js";

// Tableau qui vas receptionner les tâches entrée par l'utilisateur
const task = [];

export const addTask = (taskValue) => {
    const userEntry = taskValue;
    task.push(userEntry)

    return task;
    
}

export const createTaskInput = () => {
  containerTask.style.display = 'block';
  inputEntry.focus()
}

let taskIndexes = new Set();
let taskIndex = 1;

export const createTask = (taskName) => {
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
        if (event.key === 'Enter') {
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
    });
  
    taskIndex++
  }

