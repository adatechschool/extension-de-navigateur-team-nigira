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
    checkbox.classList.add('checkbox')
  
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
        localStorage.removeItem(index)
      });
    });
    checkbox.addEventListener('change',()=>{
      if (checkbox.checked){
        label.style.textDecoration = "line-through"
      } else {
        label.style.textDecoration = "none"
      }
    })
  
    taskIndex++
  }
  inputEntry.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && inputEntry.value !== '') {
      localStorage.setItem(taskIndex, inputEntry.value)
      createTask(inputEntry.value);
      inputEntry.value = "";
      containerTask.style.display + "none";
    }
  });
  
  buttonAdd.addEventListener('click', ()=>{
    if (inputEntry.value !== ''){
    localStorage.setItem(taskIndex, inputEntry.value)
    createTask(inputEntry.value);
    inputEntry.value = "";
    containerTask.style.display + "none";
  } else {}
  })
  
  let array = new Array()
  for (let i = 0; i < localStorage.length; i++) {
    array[i] = localStorage.getItem(localStorage.key(i))
    //createTask(localStorage.getItem(localStorage.key(i)))
  }
  localStorage.clear()
  array.forEach((taskName) => {
    localStorage.setItem(taskIndex, taskName)
    createTask(taskName)
  });
