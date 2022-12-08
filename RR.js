// ROUND-ROBIN
function round_robin(processos, quantum, qnt_processos) {
    // Criando uma lista de Burst Time restante dos processos
    let bt_restante = new Array(qnt_processos).fill(0);
    // Criando uma lista de Waiting Time
    let wt = new Array(qnt_processos).fill(0);
    // Copiando BurstTime dos processos para o bt_restante
    for (let i = 0; i < qnt_processos; i++) {
        bt_restante[i] = processos[i][2];
    }

    let tempo = 0; // Tempo total que será adicionado ao WaitingTime
    let overhead = 1; // Valor hipotetico para o tempo gasto na troca de contexto entre processos

    while (true) {
        // Variavel de Controle, verifica se os processos foram
        // finalizados ou não
        let finalizados = true;
        for (let i = 0; i < qnt_processos; i++) {
            tempo += overhead; // Para cada troca de contexto entre os processos, Adicionar ao Tempo Total

            // Se for maior que 0, ainda há processos a serem
            // Finalizados
            if (bt_restante[i] > 0) {
                finalizados = false;
                // Se o tempo restante for maior que Quantum 
                if (bt_restante[i] > quantum) {
                    // Somar quantum ao tempo de processamento
                    tempo += quantum;
                    // Retirar do BurstTime restante o Tempo(quantum)
                    // que ja foi processado
                    bt_restante[i] -= quantum;
                } else { // Caso o tempo restante seja menor que quantum
                    // Somar ao tempo, o tempo restante de bt
                    tempo += bt_restante[i];
                    // WaitingTime = tempo_total - burst_time do processo
                    wt[i] = tempo - processos[i][2];
                    // Zerando burst time
                    bt_restante[i] = 0;
                }
            }
        }
        // Se todos os Processos foram concluídos
        if (finalizados == true) {
            break;
        }
    }
    return wt; // Retornar Lista de WaitingTime
}

function turn_around_time(processos, wt, qnt_processos) {
    let tat = new Array(qnt_processos).fill(0);
    for (let x = 0; x < qnt_processos; x++) {
        tat[x] = processos[x][2] + wt[x];
    }
    return tat;
}

function average_tat(tat, qnt_processos) {
    let turnaround_time = tat.reduce((a, b) => a + b, 0);
    return (turnaround_time / qnt_processos);
}

function average_wt(wt, qnt_processos) {
    let waiting_time = wt.reduce((a, b) => a + b, 0);
    return (waiting_time / qnt_processos);
}

// Main
let processos = [];
console.log("Algoritmo Round Robin");
let qnt_processos = parseInt(prompt("Quantidade de processos: "));
for (let x = 0; x < qnt_processos; x++) {
    let pid = `P${x}`;
    let at = parseInt(prompt("Arrival Time: "));
    let bt = parseInt(prompt("Burst Time: "));
    processos.push([pid, at, bt]);
}
let quantum = parseInt(prompt("Informe o Quantum: "));

// Waiting Time
let wt = round_robin(processos, quantum, qnt_processos);
// TurnAround Time
let tat = turn_around_time(processos, wt, qnt_processos);
// Média de todos os TurnAround Time
let avg_tat = average_tat(tat, qnt_processos);
// Média de todos os Waiting Time
let avg_wt = average_wt(wt, qnt_processos);
console.log(`WT = ${wt}\nTAT = ${tat}\nAVG_TAT = ${avg_tat}\nAVG_WT = ${avg_wt}`);

console.log("| Process |\t| Burst Time |\t\t| Arrival Time |\t| Waiting Time |\t| Turn-Around Time |\t\n\n");
for (let proc = 0; proc < processos.length; proc++) {
    console.log(`${processos[proc][0]}\t\t\t${processos[proc][2]}\t\t\t${processos[proc][1]}\t\t\t${wt[proc]}\t\t\t         ${tat[proc]}\t\t\t\n`);

}

console.log(`Average Waiting Time: ${avg_wt}`);
console.log(`Average Turn-Around Time: ${avg_tat}`);  

