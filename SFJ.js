//SJF

//Funcao que calcula o tempo de espera
function waitingTime(processos) {
    // Definindo a qnt. tempo de servico baseado na qnt de processos
    const tempoServico = new Array(processos.length).fill(0);
    // Definindo tamanho da waiting list
    const wt = new Array(processos.length).fill(0);
    for (let x = 1; x < processos.length; x++) {
      tempoServico[x] = tempoServico[x - 1] + processos[x - 1][2];
      wt[x] = tempoServico[x] - processos[x][1];
      if (wt[x] < 0) {
        wt[x] = 0;
      }
    }
    return wt;
  }
  
  //Funcao que calcula o tempo de Turnaround
  function turnAroundTime(processos) {
    // Turnaround time = burstTime + waitingTime
    const tat = new Array(processos.length).fill(0);
    const wt = waitingTime(processos);
    for (let x = 0; x < processos.length; x++) {
      tat[x] = processos[x][2] + wt[x];
    }
    return tat;
  }
  
  //Funcao que calcula o tempo medio de Turnaround
  function averageTAT(processos) {
    const tat = turnAroundTime(processos).reduce((a, b) => a + b);
    // Retornando o tempo medio
    // Soma_dos_tat / qnt.Processos
    return tat / processos.length;
  }
  
  //Funcao que calcula o tempo medio de espera
  function averageWT(processos) {
    const wt = waitingTime(processos).reduce((a, b) => a + b);
    return wt / processos.length;
  }
  
  //Funcao que ordena os processos com base no menor tempo de job
  function SJF(processos) {
    for (let i = 0; i < processos.length; i++) {
      for (let j = 0; j < processos.length - 1; j++) {
        if (processos[j][2] > processos[j + 1][2]) {
          [processos[j], processos[j + 1]] = [processos[j + 1], processos[j]];
        }
      }
    }
    return processos;
  }
  
  //Funcao principal
  function main() {
    console.log(":::::::::::::::::::::::::::::::::::SJF:::::::::::::::::::::::::::::::::::");
    // Lista de processos
    let processos = [];
    let qntProcessos = parseInt(prompt("Quantidade de processos:"));
    for (let x = 0; x < qntProcessos; x++) {
      let pid = `P${x}`;
      let at = parseInt(prompt("Arrival Time:"));
      let bt = parseInt(prompt("Burst Time:"));
      processos.push([pid, at, bt]);
    }
  
    /* Estrutura da Lista de Processos
    Lista_processos = [
      [id, at, bt],
      [id2, at2, bt2],
    ]
  
    id = id do processo
    at = Arrival Time
    bt = Burst Time 
    */
    const wt = waitingTime(processos);
    const tat = turnAroundTime(processos);
    const avgWT = averageWT(processos);
    const avgTAT = averageTAT(processos);
    console.log("| Process |\t| Burst Time |\t\t| Arrival Time |\t| Waiting Time |\t| Turn-Around Time |\t| Completion Time |\n\n");
    for (let proc = 0; proc < processos.length; proc++) {
      console.log(
        `${processos[proc][0]}\t\t\t${processos[proc][2]}\t\t\t${
          processos[proc][1]
        }\t\t\t${wt[proc]}\t\t\t${tat[proc]}\t\t\t${tat[proc] +
          processos[proc][1]}\n`
      );
    }
    console.log(`Average Waiting Time: ${avgWT}`);
    console.log(`Average Turn-Around Time: ${avgTAT}`);
  
    console.log("\n:::::::::::::::::::::::DEPOIS::::::::::::::::::::::\n");
  
    processos = SJF(processos);
    const wt2 = waitingTime(processos);
    const tat2 = turnAroundTime(processos);
    const avgWT2 = averageWT(processos);
    const avgTAT2 = averageTAT(processos);
    console.log(processos);
  
    console.log("| Process |\t| Burst Time |\t\t| Arrival Time |\t| Waiting Time |\t| Turn-Around Time |\t| Completion Time |\n\n");
    for (let proc = 0; proc < processos.length; proc++) {
      console.log(
        `${processos[proc][0]}\t\t\t${processos[proc][2]}\t\t\t${
          processos[proc][1]
        }\t\t\t${wt2[proc]}\t\t\t${tat2[proc]}\t\t\t${tat2[proc] +
          processos[proc][1]}\n`
      );
    }
    console.log(`Average Waiting Time: ${avgWT2}`);
    console.log(`Average Turn-Around Time: ${avgTAT2}`);
  }
  
  main();