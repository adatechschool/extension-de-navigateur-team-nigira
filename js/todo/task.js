// Tableau qui vas receptionner les tâches entrée par l'utilisateur
const task = [];

export const addTask = (taskValue) => {
    const userEntry = taskValue;
    task.push(userEntry)

    return task;
    
}
// console.log(addTask('Faire la vaisselle'));
// console.log(addTask('Cuire un oeuf'));
