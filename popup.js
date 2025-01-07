let time = 5;

const timerElement = document.querySelector('#timer');
const timerElement2 = document.querySelector('#timer2');


let timeToWork = true;
let timeToBreak = false;
let workInterval, breakInterval;

const decreaseTime = () => {
    // Obtenir les minutes et les seconds 
    let minutes = parseInt(time / 60, 10);
    let seconds = parseInt(time % 60, 10);

    // Afficher les deux chiffres des minutes et des secondes
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerElement.innerText = `${minutes}:${seconds}`;
    time--;

    if (time <= 0) { 
        clearInterval(workInterval); 
        timeToBreak = true;
        time = 0;
        startBreakInterval()
    } 
    // Stopper le compteur à 0
    //time = time <= 0 ? 0 : time - 1
}

//setInterval(decreaseTime, 1000);


let time2 = 5;


const decreaseTime2 = () => {
    // Obtenir les minutes et les seconds 
    let minutes = parseInt(time2 / 60, 10);
    let seconds = parseInt(time2 % 60, 10);

    // Afficher les deux chiffres des minutes et des secondes
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerElement2.innerText = `${minutes}:${seconds}`;
    time2--;

    // Stopper le compteur à 0
    //time2 = time2 <= 0 ? 0 : time2 - 1
    if (time2 <= 0) { 
        clearInterval(breakInterval); 
        timeToWork = true
        time2 = 0;
        startWorkInterval()
    }
}

//setInterval(decreaseTime2, 1000);

const button = document.querySelector('.button');

const startWorkInterval = () => {
    workInterval = setInterval(decreaseTime, 1000);
}

const startBreakInterval = () => {
    breakInterval = setInterval(decreaseTime2, 1000);
}

const displayTimer = () => {
    const buttonStart = button.addEventListener('click', () => {
        if(timeToWork){
            startWorkInterval();
            timeToWork = false;
            if(timeToBreak){
                startBreakInterval()
                timeToBreak = true
            }
        }
    })
}

displayTimer()
