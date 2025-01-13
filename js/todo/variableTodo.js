// Container de la todo list
const containerTodo = document.createElement('div');
containerTodo.classList.add('containerTodo');

// Création du bouton add
export const add = document.createElement('button');
add.classList.add('buttonAdd')
add.innerText = 'Add'

// container des taches
export const containerTask = document.createElement('div');
containerTask.classList.add('containerTask');

// création de l'input
export const inputEntry = document.createElement('input');
inputEntry.type = 'text';
inputEntry.classList.add('inputEntry');
inputEntry.placeholder = 'Add your task...';

containerTask.style.display = 'none';

document.querySelector('body').appendChild(containerTodo);
containerTodo.appendChild(add);
containerTodo.appendChild(containerTask);
containerTask.appendChild(inputEntry);

// Liste des tâches
export const tasksList = document.createElement("ul");
containerTask.appendChild(tasksList);