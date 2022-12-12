// Calculate waiting time
function waitingTime(processes) {
    // Define the service time for each process based on the number of processes
    let serviceTime = new Array(processes.length).fill(0);
  
    // The service time is the sum of all the BurstTime of the previous Processes
    serviceTime[0] = 0;
  
    // Define the size of the waiting list
    let wt = new Array(processes.length).fill(0);
  
    for (let i = 1; i < processes.length; i++) {
      serviceTime[i] = serviceTime[i - 1] + processes[i - 1][1];
      wt[i] = serviceTime[i] - processes[i][0];
      if (wt[i] < 0) {
        wt[i] = 0;
      }
    }
  
    return wt;
  }
  
  // Calculate turn-around time
  function turnAroundTime(processes) {
    // TurnAround Time = BurstTime + WaitingTime
    let tat = new Array(processes.length).fill(0); // Turn-around time
    let wt = waitingTime(processes);
  
    for (let i = 0; i < processes.length; i++) {
      tat[i] = processes[i][1] + wt[i];
    }
  
    return tat;
  }
  
  // Calculate average waiting time
  function averageWT(processes) {
    let numProcesses = processes.length;
    let wt = waitingTime(processes);
  
    return wt.reduce((a, b) => a + b, 0) / numProcesses;
  }
  
  // Calculate average turn-around time
  function averageTAT(processes) {
    let numProcesses = processes.length;
    let tat = turnAroundTime(processes);
  
    return tat.reduce((a, b) => a + b, 0) / numProcesses;
  }
  
  // List of all processes
  let processes = [];
  let numProcesses = parseInt(prompt("Number of processes:"));
  
  for (let i = 0; i < numProcesses; i++) {
    let at = parseInt(prompt("Arrival time:"));
    let bt = parseInt(prompt("Burst time:"));
    processes.push([at, bt]);
  }
  
  /*
  Process structure:
    [ [arrival_time, burst_time] ]
  */
  
  console.log("Process\tBurst Time\tArrival Time\tWaiting Time\tTurn-Around Time\tCompletion Time\n\n");
  let wt = waitingTime(processes);
  let tat = turnAroundTime(processes);
  let avgWT = averageWT(processes);
  let avgTAT = averageTAT(processes);
  
  // Completion Time = Turn Around Time + Arrival Time
  for (let i = 0; i < processes.length; i++) {
    console.log(
      `${i}\t\t${processes[i][1]}\t\t${processes[i][0]}\t\t${wt[i]}\t\t${tat[i]}\t\t
  