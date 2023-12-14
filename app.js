let processList = [];
let process = {};
let tableBlock;

let algorithmType;
let tableForOutputTbl;

let firstChange = true;

$("#algorithm").change(function () {
    if (firstChange) {
        handleAlgorithmChange();
        firstChange = false;
    } else {
            $("#inputTbl,#solve").remove();
            processList.length = 0;

            handleAlgorithmChange();
        

        $("#outputContainer").remove();
        solveFirst=true;
    }
});

function handleAlgorithmChange() {
    algorithmType = $("#algorithm").val();

    switch (algorithmType) {
        case "fcfs":
        case "sjf":
        case "srtf":
            show();
            break;
        case "prio1":
        case "prio2":
            showPriority();
            break;
    }
}

function show() {
    tableBlock = `<table id="inputTbl">
                    <tr>
                        <th>Processor ID</th>
                        <th>Arrival Time</th>
                        <th>Burst Time</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" id="processID" placeholder="Process Name" required min="0" max="10">
                        </td>
                        <td>
                        <input type="number" id="arrival" placeholder="Arrival Time" required min="0" max="10">
                        </td>
                        <td>
                            <input type="number" id="burst" placeholder="Burst Time" required min="0" max="10">
                        </td>
                        <td>
                            <button type="button" id="addButton" onclick="newProcess()">Add Process</button>
                        </td>
                    </tr>
                </table>
                <button type="button" id="solve" onclick="solveBtn()">Solve</button>`
    $("form").append(tableBlock);
    $("#chooseOne").remove();
}
function showPriority() {
    tableBlock = `<table id="inputTbl">
    <tr>
    <th>Processor ID</th>
                    <th>Arrival Time</th>
                    <th>Burst Time</th>
                    <th id="prioHead">Priority</th>
                    <th></th>
                </tr>
                <tr>
                    <td>
                    <input type="text" id="processID" placeholder="Process Name" required min="0" max="10">
                    </td>
                    <td>
                        <input type="number" id="arrival" placeholder="Arrival Time" required min="0" max="10">
                    </td>
                    <td>
                    <input type="number" id="burst" placeholder="Burst Time" required min="0" max="10">
                    </td>
                    <td>
                    <input type="number" id="priority" placeholder="Priority" required min="0" max="10">
                    </td>
                    <td>
                        <button type="button" id="addButton" onclick="newProcess()">Add Process</button>
                    </td>
                    </tr>
                    </table>
                    <button type="button" id="solve" onclick="solveBtn()">Solve</button>`;
    $("form").append(tableBlock);
    $("#chooseOne").remove();

}

let newRowTop = `<tr>
                    <td>
                        <input type="text" id="processID" placeholder="Process Name" required min="0" max="10">
                    </td>
                    <td>
                    <input type="number" id="arrival" placeholder="Arraival Time" required min="0" max="10">
                    </td>
                    <td>
                        <input type="number" id="burst" placeholder="Burst Time" required min="0" max="10">
                    </td>
                    <td>
                        <button type="button" id="addButton" onclick="newProcess()">Add Process</button>
                    </td>
                </tr>`;
let newRowPrio = `<tr>
                    <td>
                    <input type="text" id="processID" placeholder="Process Name" required min="0" max="10">
                    </td>
                    <td>
                        <input type="number" id="arrival" placeholder="Arraival Time" required min="0" max="10">
                    </td>
                    <td>
                    <input type="number" id="burst" placeholder="Burst Time" required min="0" max="10">
                    </td>
                    <td>
                    <input type="number" id="priority" placeholder="Priority" required min="0" max="10">
                    </td>
                    <td>
                        <button type="button" id="addButton" onclick="newProcess()">Add Process</button>
                    </td>
                </tr>`;


function newProcess() {
    let processID = $("#processID");
    let arrivalTime = $("#arrival");
    let burstTime = $("#burst");
    let priorityNum = $("#priority");

    if (processID.val() === "" || arrivalTime.val() === "" || burstTime.val() === "" || priorityNum.val() === "") {
        alert("Please Enter the Required Input")
        return;
    }
    else {
        process = { processName: "", arrival: 0, burst: 0, priority: 0 }
        if (algorithmType === "fcfs" || algorithmType === "sjf" || algorithmType === "srtf") {
            process.processName = processID.val();
            process.arrival = parseInt(arrivalTime.val());
            process.burst = parseInt(burstTime.val());

            processList.push(process);
            $("#addButton").remove();

            $("#processID, #arrival, #burst,#priority").prop('readonly', true).removeAttr("id");

            $("#inputTbl").append(newRowTop);
        }
        if (algorithmType === "prio1" || algorithmType === "prio2") {
            process.processName = processID.val();
            process.arrival = parseInt(arrivalTime.val());
            process.burst = parseInt(burstTime.val());
            process.priority = parseInt(priorityNum.val());
            processList.push(process);
            $("#addButton").remove();
            $("#processID, #arrival, #burst,#priority").prop('readonly', true).removeAttr("id");

            $("#inputTbl").append(newRowPrio);

        }


    }

}
let solveFirst=true;
function solveBtn() {
    if (processList.length == 0) {
        alert("Please enter atleast one Process")
    }
    else {
        let processID = $("#processID");
        let arrivalTime = $("#arrival");
        let burstTime = $("#burst");
        let priorityNum = $("#priority");
        if (solveFirst) {
            if (processID.val() == "" || arrivalTime.val() == "" || burstTime.val() == "" || priorityNum.val() == "") {
                $("#processID, #arrival, #burst,#priority").prop('readonly', true).removeAttr("id");
                solveFunction();
            }
            else {
                process = { processName: "", arrival: 0, burst: 0, priority: 0 };
                process.processName = processID.val();
                process.arrival = parseInt(arrivalTime.val());
                process.burst = parseInt(burstTime.val());
                process.priority = parseInt(priorityNum.val());
                processList.push(process);
                $("#processID, #arrival, #burst,#priority").prop('readonly', true).removeAttr("id");
                solveFunction();
                
            }
            solveFirst=false;
            
        }
        $("#processID, #arrival, #burst,#priority").prop('readonly', true).removeAttr("id");

        solveFunction();

    }

}
function showOutputContainer() {
    var outputBlock = `<div id="outputContainer" class="hide">
    <h2>OUTPUT</h2>
    <table border="1" style="border-collapse: collapse;" id="outputTbl">

        <tr>
            <th>Process</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
            <th>Completion Time</th>
            <th>Turnaround Time</th>
            <th>Waiting Time</th>
        </tr>

    </table>
    <div id="tt">
        <span>Average Turnaround Time:</span>
        
    </div>
    <div id="wt">
        <span>Average Waiting Time:</span>
        

    </div>
    

</div>`
    $("body").append(outputBlock);
}


function solveFunction() {
    $("#outputContainer").remove();
    showOutputContainer();
    avgTt=0,avgWt=0;
    switch (algorithmType) {
        case "fcfs":
            solveFCFS();
            break;
        case "sjf":
            solveSJF();
            break;
        case "srtf":
            solveSRTF();
            break;
        case "prio1":
            solvePriority1();
            break;
        case "prio2":
            solvePriority2();
            break;
    }
}


let wt = [];
let tat = [];
let avgTt = 0;
let avgWt = 0;

function solveFCFS() {
    let tempList = [];
    let currentTime = 0;
    let readyQ = [];

    processList.sort((a, b) => a.arrival - b.arrival);

    tempList = [...processList];
    processList.length = 0;
    while (tempList.length > 0) {
        readyQ.length = 0;
        for (let i = 0; i < tempList.length; i++) {
            if (tempList[i].arrival <= currentTime) {
                readyQ.push(tempList[i]);
            }
        }

        if (readyQ.length > 0) {
            readyQ.sort((a, b) => a.arrival - b.arrival);

            let executedProcess = readyQ.shift();

            currentTime += executedProcess.burst;
            executedProcess.ct = currentTime;

            processList.push(executedProcess);
        } else {
            currentTime = tempList[0].arrival;
        }

        tempList = tempList.filter((process) => !processList.includes(process));
    }

    for (let i = 0; i < processList.length; i++) {
        processList[i].tat = processList[i].ct - processList[i].arrival;
        processList[i].wt = processList[i].tat - processList[i].burst;
    }
    for (let i = 0; i < processList.length; i++) {
        avgTt += processList[i].tat;
        avgWt += processList[i].wt;
    }
    avgTt = avgTt / processList.length;
    avgWt = avgWt / processList.length;

    displayOutputTbl();
}



function solvePriority1() {
    let tempList = [];
    let currentTime = 0;
    let readyQ = [];

    processList.sort((a, b) => a.priority - b.priority);

    tempList = [...processList];
    processList.length = 0;
    while (tempList.length > 0) {
        readyQ.length = 0;
        for (let i = 0; i < tempList.length; i++) {
            if (tempList[i].arrival <= currentTime) {
                readyQ.push(tempList[i]);
            }
        }

        if (readyQ.length > 0) {
            readyQ.sort((a, b) => a.arrival - b.arrival);

            let executedProcess = readyQ.shift();

            currentTime += executedProcess.burst;
            executedProcess.ct = currentTime;

            processList.push(executedProcess);
        } else {
            currentTime = tempList[0].arrival;
        }

        tempList = tempList.filter((process) => !processList.includes(process));
    }

    for (let i = 0; i < processList.length; i++) {
        processList[i].tat = processList[i].ct - processList[i].arrival;
        processList[i].wt = processList[i].tat - processList[i].burst;
    }
    for (let i = 0; i < processList.length; i++) {
        avgTt += processList[i].tat;
        avgWt += processList[i].wt;
    }
    avgTt = avgTt / processList.length;
    avgWt = avgWt / processList.length;

    displayOutputTbl();
}


function solveSJF() {
    let tempList = [];
    let currentTime = 0;
    let readyQ = [];

    processList.sort((a, b) => { if (a.arrival === b.arrival) { return a.burst - b.burst; } return a.arrival - b.arrival; });

    tempList = [...processList];
    processList.length = 0;
    while (tempList.length > 0) {
        readyQ.length = 0;
        for (let i = 0; i < tempList.length; i++) {
            if (tempList[i].arrival <= currentTime) {
                readyQ.push(tempList[i]);
            }
        }

        if (readyQ.length > 0) {
            readyQ.sort((a, b) => a.burst - b.burst);

            let executedProcess = readyQ.shift();

            currentTime += executedProcess.burst;
            executedProcess.ct = currentTime;

            processList.push(executedProcess);
        } else {
            currentTime = tempList[0].arrival;
        }

        tempList = tempList.filter((process) => !processList.includes(process));
    }
    for (let i = 0; i < processList.length; i++) {
        processList[i].tat = processList[i].ct - processList[i].arrival;
        processList[i].wt = processList[i].tat - processList[i].burst;
    }
    for (let i = 0; i < processList.length; i++) {
        avgTt += processList[i].tat;
        avgWt += processList[i].wt;
    }
    avgTt = avgTt / processList.length;
    avgWt = avgWt / processList.length;

    displayOutputTbl();

}


function solveSRTF() {
    let tempList = [];
    let currentTime = 0;
    let readyQ = [];

    processList.sort((a, b) => { if (a.arrival === b.arrival) { return a.burst - b.burst; } return a.arrival - b.arrival; });
    for (let i = 0; i < processList.length; i++) {
        processList[i].remainingTime = processList[i].burst;
    }
    tempList = [...processList];
    processList.length = 0;

    while (tempList.length > 0) {
        readyQ.length = 0;

        while (true) {

            for (let i = 0; i < tempList.length; i++) {
                if (tempList[i].arrival <= currentTime) {
                    readyQ.push(tempList[i]);
                }
            }

            if (readyQ.length > 0) {
                readyQ.sort((a, b) => a.remainingTime - b.remainingTime);

                let executedProcess = readyQ.shift();

                currentTime += 1;
                executedProcess.remainingTime -= 1;

                if (executedProcess.remainingTime === 0) {
                    executedProcess.ct = currentTime;
                    processList.push(executedProcess);
                    break;
                }

            }
            else {
                currentTime += 1;
            }
        }

        tempList = tempList.filter((process) => !processList.includes(process));
    }

    for (let i = 0; i < processList.length; i++) {
        processList[i].tat = processList[i].ct - processList[i].arrival;
        processList[i].wt = processList[i].tat - processList[i].burst;
    }

    for (let i = 0; i < processList.length; i++) {
        avgTt += processList[i].tat;
        avgWt += processList[i].wt;
    }

    avgTt = avgTt / processList.length;
    avgWt = avgWt / processList.length;

    displayOutputTbl();
}

function solvePriority2() {
    let tempList = [];
    let currentTime = 0;
    let readyQ = [];

    processList.sort((a, b) => a.priority - b.priority);
    for (let i = 0; i < processList.length; i++) {
        processList[i].remainingTime = processList[i].burst;
    }
    tempList = [...processList];
    processList.length = 0;

    while (tempList.length > 0) {
        readyQ.length = 0;

        while (true) {

            for (let i = 0; i < tempList.length; i++) {
                if (tempList[i].arrival <= currentTime) {
                    readyQ.push(tempList[i]);
                }
            }

            if (readyQ.length > 0) {
                readyQ.sort((a, b) => a.priority - b.priority);

                let executedProcess = readyQ.shift();

                currentTime += 1;
                executedProcess.remainingTime -= 1;

                if (executedProcess.remainingTime === 0) {
                    executedProcess.ct = currentTime;
                    processList.push(executedProcess);
                    break;
                }

            }
            else {
                currentTime += 1;
            }
        }

        tempList = tempList.filter((process) => !processList.includes(process));
    }

    for (let i = 0; i < processList.length; i++) {
        processList[i].tat = processList[i].ct - processList[i].arrival;
        processList[i].wt = processList[i].tat - processList[i].burst;
    }

    for (let i = 0; i < processList.length; i++) {
        avgTt += processList[i].tat;
        avgWt += processList[i].wt;
    }

    avgTt = avgTt / processList.length;
    avgWt = avgWt / processList.length;

    displayOutputTbl();
}




function displayOutputTbl() {

    for (let i = 0; i < processList.length; i++) {
        tableForOutputTbl = `<tr>
                                <td>${processList[i].processName}</td>
                                <td>${processList[i].arrival}</td>
                                <td>${processList[i].burst}</td>
                                <td>${processList[i].ct}</td>
                                <td>${processList[i].tat}</td>
                                <td>${processList[i].wt}</td>
                            </tr>`;

        $("#outputTbl").append(tableForOutputTbl);
    }
    $("#tt").append(`<span>${avgTt}</span>`);
    $("#wt").append(`<span>${avgWt}</span>`);
}
