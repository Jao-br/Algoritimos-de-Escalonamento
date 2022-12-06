void main() {
  List processos = [];
  print(":::::::::::::::::::::::::::::::::::SJF:::::::::::::::::::::::::::::::::::");

  int qnt_processos = int.parse(stdin.readLineSync());
  for (var x = 0; x < qnt_processos; x++) {
    String pid = "P$x";
    int at = int.parse(stdin.readLineSync());
    int bt = int.parse(stdin.readLineSync());
    processos.add([pid, at, bt]);
  }
  
  // Estrutura da Lista de Processos
  //  Lista_processos = [
  //                    [id, at, bt],
  //                    [id2, at2, bt2],
  //                   ]
  //
  //   id = id do processo
  //   at = Arrival Time
  //   bt = Burst Time
  //

  List wt = waiting_time(processos);
  List tat = turn_around_time(processos);
  int avg_wt = average_wt(processos);
  int avg_tat = average_tat(processos);
  print("| Process |\t| Burst Time |\t\t| Arrival Time |\t| Waiting Time |\t| Turn-Around Time |\t| Completion Time |\n\n");
  for (var proc = 0; proc < processos.length; proc++) {
    print("${processos[proc][0]}\t\t\t${processos[proc][2]}\t\t\t${processos[proc][1]}\t\t\t${wt[proc]}\t\t\t${tat[proc]}\t\t\t${tat[proc] + processos[proc][1]}\n");
  }

  print("Average Waiting Time: $avg_wt");
  print("Average Turn-Around Time: $avg_tat");

  print("\n:::::::::::::::::::::::DEPOIS::::::::::::::::::::::\n");

  processos = SJF(processos);
  wt = waiting_time(processos);
  tat = turn_around_time(processos);
  avg_wt = average_wt(processos);
  avg_tat = average_tat(processos);
  print(processos);

  print("| Process |\t| Burst Time |\t\t| Arrival Time |\t| Waiting Time |\t| Turn-Around Time |\t| Completion Time |\n\n");
  for (var proc = 0; proc < processos.length; proc++) {
    print("${processos[proc][0]}\t\t\t${processos[proc][2]}\t\t\t${processos[proc][1]}\t\t\t${wt[proc]}\t\t\t${tat[proc]}\t\t\t${tat[proc] + processos[proc][1]}\n");
  }

  print("Average Waiting Time: $avg_wt");
  print("Average Turn-Around Time: $avg_tat");
}

List waiting_time(List processos) {
  // definindo a qnt. tempo de servico baseado na qnt de processos
  List tempo_servico = List.filled(processos.length, 0);
  // definindo tamanho da waiting list
  List wt = List.filled(processos.length, 0);
  for (var x = 1; x < processos.length; x++) {
    tempo_servico[x] = (tempo_servico[x - 1] + processos[x - 1][2]);
    wt[x] = tempo_servico[x] - processos[x][1];
    if (wt[x] < 0) {
      wt[x] = 0;
    }
  }
  return wt;
}

List turn_around_time(List processos) {
  // turnaround time = burstTime + waitingTime
  List tat = List.filled(processos.length, 0);
  List wt = waiting_time(processos);
  for (var x = 0; x < processos.length; x++) {
    tat[x] = processos[x][2] + wt[x];
  }
  return tat;
}

int average_tat(List processos) {
  int tat = 0;
  List tat_list = turn_around_time(processos);
  tat_list.forEach((item) => tat = tat + item);
  // Retornando o tempo medio 
  // Soma_dos_tat / qnt.Processos
  return (tat / processos.length);
}

int average_wt(List processos) {
  int wt = 0;
  List wt_list = waiting_time(processos);
  wt_list.forEach((item) => wt = wt + item);
  return (wt / processos.length);
}

List SJF(List processos) {
  // Ordenando por Job(Burst time) mais curto
  for (var i = 0; i < processos.length; i++) {
    for (var j = 0; j < processos.length - 1; j++) {
      if (processos[j][2] > processos[j + 1][2]) {
        var aux = processos[j];
        processos[j] = processos[j + 1];
        processos[j + 1] = aux;
      }
    }
  }
  return processos;
}