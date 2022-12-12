# Este código implementa um simulador do algoritmo FCFS (First-Come, First-Served). O algoritmo FCFS é um algoritmo de escalonamento de processos que atribui a cada processo o tempo de CPU conforme ele é recebido pelo sistema. Ele é considerado um algoritmo não-preemptivo, o que significa que os processos são executados até o fim sem interrupções.

# O código possui quatro funções: waiting_time, turn_around_time, average_wt e average_tat. A primeira função, waiting_time, calcula o tempo de espera de cada processo. O tempo de espera de um processo é calculado como a diferença entre o tempo de serviço e o tempo de chegada. O tempo de serviço é a soma dos tempos de execução de todos os processos que já foram atendidos pelo sistema. A segunda função, turn_around_time, calcula o tempo de retorno (ou turnaround time) de cada processo. O tempo de retorno de um processo é calculado como a soma do tempo de espera e do tempo de execução do processo. As funções average_wt e average_tat calculam a média dos tempos de espera e dos tempos de retorno, respectivamente.

# O código também possui um laço que solicita ao usuário a quantidade de processos e, em seguida, pede a chegada e o tempo de execução de cada processo. Ele então imprime uma tabela com informações sobre cada processo, incluindo o tempo de espera, o tempo de retorno e o tempo de término. Por fim, ele imprime as médias dos tempos de espera e de retorno.




# Calcular Waiting Time
def waiting_time(processos):
    #Definindo a quantidade tempos de servico de cada baseado na qnt. de processos
    tempo_servico = [0] * len(processos)
    #O tempo de servico é a soma de todos os BurstTime dos Processos anteriores
    tempo_servico[0] = 0
    # Definindo tamanho da waiting list
    wt = [0] * len(processos)

    for x in range(1, len(processos)):
        tempo_servico[x] = (tempo_servico[x-1] + processos[x-1][1])
        wt[x] = tempo_servico[x] - processos[x][0]
        if (wt[x] < 0):
            wt[x] = 0
    return wt

# Calcular Turn around Time
def turn_around_time(processos):
    #TurnAround Time = BurstTime + WaitingTime
    tat = [0] * len(processos) # Turn around time
    wt = waiting_time(processos)
    for x in range(len(processos)):
        tat[x] = processos[x][1] + wt[x]
    return tat

# Calcular media do waiting time
def average_wt(processos):
    qnt_proc = len(processos)
    wt = sum(waiting_time(processos))
    return (wt / qnt_proc)

# Calcular media do Turnaround time
def average_tat(processos):
    qnt_proc = len(processos)
    tat = sum(turn_around_time(processos))
    return (tat / qnt_proc)


#####################################################################

# Lista de todos os processos
processos = []
qnt_processos = int(input("Qnt de Processos: "))
for x in range(qnt_processos):
    at = int(input("Arrival Time: "))
    bt =  int(input("Burst Time: "))
    processos.append([at, bt])

"""
Estrutura do Processo
    [ [arrival_time, burst_time] ]
"""


print("Process\tBurst Time\tArrival Time\tWaiting Time\tTurn-Around Time\tCompletion Time\n\n")
wt = waiting_time(processos)
tat = turn_around_time(processos)
avg_wt = average_wt(processos)
avg_tat = average_tat(processos)
# Completion Time = Turn Around Time + Arrival Time
for proc in range(len(processos)):
    print(f"{proc}\t\t{processos[proc][1]}\t\t{processos[proc][0]}\t\t{wt[proc]}\t\t{tat[proc]}\t\t{tat[proc] + processos[proc][0]}\n")
print(f"Average Waiting Time : {avg_wt}")
print(f"Average Turn-Around Time: {avg_tat}")
