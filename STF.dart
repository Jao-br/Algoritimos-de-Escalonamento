
void SJF(List<List<int>> processos) {
  // Ordenando por Job(Burst time) mais curto
  for (var i = 0; i < processos.length; i++) {
    for (var j = 0; j < processos.length - 1; j++) {
      if (processos[j][2] > processos[j + 1][2]) {
        var temp = processos[j];
        processos[j] = processos[j + 1];
        processos[j + 1] = temp;
      }
    }
  }
}

List<int> waitingTime(List<List<int>> processos) {
  // definindo a qnt. tempo de servico baseado na qnt de processos
  List<int> tempoServico = List<int>.filled(processos.length, 0);
  // definindo tamanho da waiting list
  List<int> wt = List<int>.filled(processos.length, 0);

  for (var x = 1; x < processos.length; x++) {
    tempoServico[x] = tempoServico[x - 1] + processos[x - 1][2];
    wt[x] = tempoServico[x] - processos[x][1];

    if (wt[x] < 0) {
      wt[x] = 0;
    }
  }
  return wt;
}

List<int> turnAroundTime(List<List<int>> processos) {
  // turnaround time = burstTime + waitingTime
  List<int> tat = List<int>.filled(processos.length, 0);
  List<int> wt = waitingTime(processos);

  for (var x = 0; x < processos.length; x++) {
    tat[x] = processos[x][2] + wt[x];
  }
  return tat;
}

double averageTAT(List<List<int>> processos) {
  List<int> tat = turnAroundTime(processos);
  // Retornando o tempo medio
  // Soma_dos_tat / qnt.Processos
  return tat.reduce((a, b) => a + b) / processos.length;
}

double averageWT(List<List<int>> processos) {
  List<int> wt = waitingTime(processos);
  return wt.reduce((a, b) => a + b) / processos.length;
}

void main() {
 print(":::::::::::::::::::::::::::::::::::SJF:::::::::::::::::::::::::::::::::::");

  List<List<int>> processos = [];
  print("Quantidade de processos: ");
  int qntProcessos = int.parse(stdin.readLineSync());

  for (var x = 0; x < qntProcessos; x++) {
    String pid = "P$x";
    print("Arrival Time: ");
    int at = int.parse(stdin.readLineSync());
    print("Burst Time: ");
    int bt = int.parse(stdin.readLineSync());
    processos.add([pid, at, bt]);
  }

  List<int> wt = waitingTime(processos);
  List<int> tat = turnAroundTime(processos);
  double avgWT = averageWT(processos);
  double avgTAT = averageTAT(processos);
  print("| Process |\t| Burst Time |\t\t| Arrival Time |\t| Waiting Time |\t| Turn-Around Time |\t| Completion Time |\n\n");

  for (var proc = 0; proc < processos.length; proc++) {
    print(
        "${processos[proc][0]}\t\t\t${processos[proc][2]}\t\t\t${processos[proc][1]}\t\t\t${wt[proc]}\t\t\t${tat[proc]}\t\t\t${tat[proc] + processos[proc][1]}\n");
  }

  print("Average Waiting Time: $avgWT");
  print("Average Turn-Around Time: $avgTAT");

  print("\n:::::::::::::::::::::::DEPOIS::::::::::::::::::::::\n");

  SJF(processos);
  wt = waitingTime(processos);
  tat = turnAroundTime(processos);
  avgWT = averageWT(processos);
  avgTAT = averageTAT(processos);
  print(processos);

  print("| Process |\t| Burst Time |\t\t| Arrival Time |\t| Waiting Time |\t| Turn-Around Time |\t| Completion Time |\n\n");

  for (var proc = 0; proc < processos.length; proc++) {
    print(
        "${processos[proc][0]}\t\t\t${processos[proc][2]}\t\t\t${processos[proc][1]}\t\t\t${wt[proc]}\t\t\t${tat[proc]}\t\t\t${tat[proc] + processos[proc][1]}\n");
  }

  print("Average Waiting Time: $avgWT");
  print("Average Turn-Around Time: $avgTAT");
}