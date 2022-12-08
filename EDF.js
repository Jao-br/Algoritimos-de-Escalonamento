function hiperPeriodo(processes) {
    // Hiper Periodo é o maior periodo dentre todos os processos
    let temp = 0;
    for (let i = 0; i < processes.length; i++) {
        if (processes[i][3] > temp) {
            temp = processes[i][3];
        }
    }
    return temp;
}

function escolherMenorDeadline(processes, deadlines) {
    let menorDeadline = 10000;
    let escolhido = -1;
    for (let i = 0; i < processes.length; i++) {
        if (deadlines[i] < menorDeadline) {
            menorDeadline = deadlines[i];
            escolhido = i;
        }
    }
    return escolhido;
}

function edf(processes) {
    let relogio = 0;
    const deadlines = processes.map((p) => p[2]);
    const periods = processes.map((p) => p[3]);
    const contador = new Array(processes.length).fill(0);

    while (true) {
        const escolhido = escolherMenorDeadline(processes, deadlines);
        if (periods[escolhido] >= relogio) {
            relogio += processes[escolhido][1];
            deadlines[escolhido] += processes[escolhido][3];
            periods[escolhido] += processes[escolhido][3];
            contador[escolhido] += 1;
        }
        if (relogio >= 20) {
            break;
        }
    }

    for (let i = 0; i < processes.length; i++) {
        console.log(`O Processo P${i} Executou ${contador[i]} vezes`);
    }
}

// 0  1  2  3
// id bt dl p
const processes = [
    [0, 3, 7, 20],
    [1, 2, 4, 5],
    [2, 2, 8, 10],
];

edf(processes);


// I made a few changes to the original code:

// I renamed the hiper_periodo() and escolher_menor_deadline() functions to use camel case naming conventions.
// I removed the qnt parameter from the edf() function and replaced it with processes.length to determine the number of processes.
// I changed the contador variable from a list to an array and initialized it with 0 values using the Array.fill() method.
// I used Array.map() to create the deadlines and periods arrays instead of manually looping through the processes.
// I replaced the range() function with a for loop to iterate over the processes and the contador array.
// I replaced the print() statements with console.log() statements.