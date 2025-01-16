import { createTask } from "./task.js";
import { inputEntry, containerTask } from "./variableTodo.js";

export const handlePress = (e) => {
    if (e.key === 'Enter' && inputEntry.value !== '') {
        createTask(inputEntry.value);
        inputEntry.value = "";
        containerTask.style.display + "none";
    }
}