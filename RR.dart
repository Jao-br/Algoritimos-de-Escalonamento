import 'dart:io';

// ROUND-ROBIN
roundRobin(List<List<dynamic>> processos, int quantum, int qnt_processos) {
  // Criando uma lista de Burst Time restante dos processos
  List<int> bt_restante = List<int>(qnt_processos);
  // Criando uma lista de Waiting Time
  List<int> wt = List<int>(qnt_processos);
  // Copiando BurstTime dos processos para o bt_restante
  for (int i = 0; i < qnt_processos; i++) {
    bt_restante[i] = processos[i][2];
  }

  int tempo = 0; // Tempo total que será adicionado ao WaitingTime
  int overhead = 1; // Valor hipotetico para o tempo gasto na troca de contexto entre processos

  while (true) {
    // Variavel de Controle, verifica se os processos foram
    // finalizados ou não
    bool finalizados = true;
    for (int i = 0; i < qnt_processos; i++) {
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

turnAroundTime(List<List<dynamic>> processos, List<int> wt, int qnt_processos) {
  List<int> tat = List<int>(qnt_processos);
  for (int x = 0; x < qnt_processos; x++) {
    tat[x] = processos[x][2] + wt[x];
  }
  return tat;
}

averageTAT(List<int> tat, int qnt_processos) {
  int turnaroundTime = 0;
  for (int x = 0; x < qnt_processos; x++) {
    turnaroundTime += tat[x];
  }
  return (turnaroundTime / qnt_processos);
}

averageWT(List<int> wt, int qnt_processos) {
  int waitingTime = 0;
  for (int x = 0; x < qnt_processos; x++) {
    waitingTime += wt[x];
  }
  return (waitingTime / qnt_processos);
}

void main() {
  List<List<dynamic>> processos = [];
  print('Algoritmo Round Robin');
  int qnt_processos = int.parse(stdin.readLineSync());
  for (int x = 0; x < qnt_processos; x++) {
    String pid = 'P$x';
    int at = int.parse(stdin.readLineSync());
    int bt = int.parse(stdin.readLineSync());
    processos.add([pid, at, bt]);
  }
  int quantum = int.parse(stdin.readLineSync());

  // Waiting Time
  List<int> wt = roundRobin(processos, quantum, qnt_processos);
  // TurnAround Time
  List<int> tat = turnAroundTime(processos, wt, qnt_processos);
  // Média de todos os TurnAround Time
  double avg_tat = averageTAT(tat, qnt_processos);
  // Média de todos os Waiting Time
  double avg_wt = averageWT(wt, qnt_processos);
  print('WT = $wt\nTAT = $tat\nAVG_TAT = $avg_tat\nAVG_WT = $avg_wt');

  print('| Process |\t| Burst Time |\t\t| Arrival Time |\t| Waiting Time |\t| Turn-Around Time |\t\n\n');
  for (int proc = 0; proc < processos.length; proc++) {
    print('${processos[proc][0]}\t\t\t${processos[proc][2]}\t\t\t${processos[proc][1]}\t\t\t${wt[proc]}\t\t\t         ${tat[proc]}\t\t\t\n');
  }

  print('Average Waiting Time: $avg_wt');
  print('Average Turn-Around Time: $avg_tat');
}