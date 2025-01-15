// Tableau qui vas receptionner les tâches entrée par l'utilisateur
const task = [];

export const addTask = (taskValue) => {
    const userEntry = taskValue;
    task.push(userEntry)

    return task;
    
}

