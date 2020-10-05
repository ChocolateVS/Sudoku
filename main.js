let cell;
let previous = id("p"); 

let solved = "";
function id(id){return document.getElementById(id)}

function fillEmpty(g) {
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            g.rows[i][j] = "";
        }
        for (j = 0; j < 9; j++) {
            g.columns[i][j] = "";
        }
        for (j = 0; j < 9; j++) {
            g.boxes[i][j] = "";
        }
    }
}

let grid = {
    rows:[[], [], [], [], [], [], [], [], []],
    columns:[[], [], [], [], [], [], [], [], []],
    boxes:[[], [], [], [], [], [], [], [], []]
}
    
fillEmpty(grid);

document.querySelectorAll('.input').forEach(item => {
    item.addEventListener('input', changed, event); 
});

let nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
function changed() {
    let e = event.target.value;
    if (nums.includes(e)) {
        change(event.target.id, e);
    }
    else {
        id(event.target.id).value = "";
    }
}

function change(val1, val2) {
    let cellN = val1;
    let cellV = val2;
    let cellC = ((cellN - 1) % 9);
    let cellR = Math.floor(cellN / 9.1);
    let cellBC = Math.floor(cellC / 3); 
    let cellBR = Math.floor(cellR / 3); 
    let cellB = cellBC + (cellBR*3);
    let cellBX = ((cellN - 1) % 3);
    let cellBY = ((cellR) % 3);//Math.floor((cellC) / 3);
    let cellBN = cellBX + (cellBY * 3);
 
    grid.columns[cellC][cellR] = cellV;
    grid.rows[cellR][cellC] = cellV;
    grid.boxes[cellB][cellBN] = cellV;
}

function sel(val) {
    cell = id(val);
    
    console.log(val);
    if (!id(val).readOnly) {
        //cell.style.backgroundColor = "rgba(150, 150, 150, 0.5)";
        //previous.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    }
    previous = cell;
}

function press(val) {
    if (!id(val).readOnly) {
        if (val > 0) {
            cell.value = val;
            change(cell.id, val);
        } 
        if (val == 0) {
            previous.value = "";
            change(cell.id, "");
        }    
    }
}

function clearGrid() {
    for (c = 1; c <= 81; c++) {
        id("cell" + c).children[0].children[0].value = "";
        id("cell" + c).children[0].children[0].style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        id("cell" + c).children[0].children[0].removeAttribute('readonly');
    }
}

function doUndo(){
  document.execCommand('undo', false, null);
}

function doRedo(){
  document.execCommand('redo', false, null);
}

function randomNum(r) {
    return Math.floor(Math.random() * r) + 1;
}
        
function fill() {
    for (i = 0; i < 81; i++) {
        var val = randomNum(9);
        id("cell" + (i + 1)).children[0].value = val;
    }
}

function check(sud) {
    let r = true;
    let c = true;
    let b = true;
    let total = 0;
    
    //Check Rows
    for (i = 0; i < 9; i++) {
        let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        arr.length = 9;
        sud.rows[i].forEach(e => {
           if (e != "") {
               total++;
           }
           arr[e - 1] += 1; 
        });
        count = 0;
        arr.forEach(e => {
            count++;
            if (e > 1) {
                console.log("Invalid Row", i, "Found: ", e, count, "'s");
                r = false;
            }    
        });
    }
    
    //Check Cols
    for (i = 0; i < 9; i++) {
        let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        arr.length = 9;
        sud.columns[i].forEach(e => {
           arr[e - 1] += 1; 
        });
        count = 0;
        arr.forEach(e => {
            count++;
            if (e > 1) {
                console.log("Invalid Column", i, "Found: ", e, count, "'s");
                r = false;
            } 
        });
    }
            
    //Check Boxes
    for (i = 0; i < 9; i++) {
        let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        arr.length = 9;
        sud.boxes[i].forEach(e => {
           arr[e - 1] += 1; 
        });
        count = 0;
        arr.forEach(e => {
            count++;
            if (e > 1) {
                console.log("Invalid Box", i, "Found: ", e, count, "'s");
                r = false;
            } 
        });
    }
    
    if (total == 81 && r & c & b) {
        console.log("SUDOKU SOLVED!");
        id("stat").innerHTML = "SUDOKU SOLVED!";
        id("stat").style.color = "green";
    }
    else {
        console.log("ERROR NO GOOD", total, r, c, b);
        if (total == 81) {
            id("stat").innerHTML = "ERROR NO GOOD FIX YOUR MISTAKES!";
        }
        else {
            id("stat").innerHTML = "SUDOKU NOT COMPLETE!";
        }
        
        id("stat").style.color = "red";
    }
}

function gen() {
    let defSud = {
        rows:[
            ["1", "3", "5", "7", "9", "2", "4", "6", "8"],
            ["6", "8", "4", "1", "3", "5", "2", "9", "7"],
            ["2", "9", "7", "6", "8", "4", "1", "3", "5"],
            ["5", "1", "3", "9", "2", "7", "8", "4", "6"],
            ["4", "7", "8", "3", "1", "6", "5", "2", "9"],
            ["9", "2", "6", "5", "4", "8", "3", "7", "1"],
            ["3", "5", "1", "4", "7", "9", "6", "8", "2"],
            ["8", "4", "9", "2", "6", "1", "7", "5", "3"],
            ["7", "6", "2", "8", "5", "3", "9", "1", "4"],
        ],
        columns:[
            ["1", "6", "2", "5", "4", "9", "3", "8", "7"],
            ["3", "8", "9", "1", "7", "2", "5", "4", "6"],
            ["5", "4", "7", "3", "8", "6", "1", "9", "2"],
            ["7", "1", "6", "9", "3", "5", "4", "2", "8"],
            ["9", "3", "8", "2", "1", "4", "7", "6", "5"],
            ["2", "5", "4", "7", "6", "8", "9", "1", "3"],
            ["4", "2", "1", "8", "5", "3", "6", "7", "9"],
            ["6", "9", "3", "4", "2", "7", "8", "5", "1"],
            ["8", "7", "5", "6", "9", "1", "2", "3", "4"],
        ],
        boxes:[
            [], [], [], [], [], [], [], [], []
        ]
    }
    
    //SWAP A BUNCH OF RANDOM NUMBERS
    for (i = 0; i < 9; i++) {
        let num1 = randomNum(9);
        let num2 = randomNum(9);
        for (i = 0; i < 9; i++) {
            for (j = 0; j < 9; j++) {
                if (defSud.rows[i][j] == num1) {
                    defSud.rows[i][j] = "0";
                }
            }
        }
        for (i = 0; i < 9; i++) {
            for (j = 0; j < 9; j++) {
                if (defSud.rows[i][j] == num2) {
                    defSud.rows[i][j] = num1.toString();
                }
            }
        }
        for (i = 0; i < 9; i++) {
            for (j = 0; j < 9; j++) {
                if (defSud.rows[i][j] == "0") {
                    defSud.rows[i][j] = num2.toString();
                }
            }
        }
        for (i = 0; i < 9; i++) {
            for (j = 0; j < 9; j++) {
                if (defSud.columns[i][j] == num1) {
                    defSud.columns[i][j] = "0";
                }
            }
        }
        for (i = 0; i < 9; i++) {
            for (j = 0; j < 9; j++) {
                if (defSud.columns[i][j] == num2) {
                    defSud.columns[i][j] = num1.toString();
                }
            }
        }
        for (i = 0; i < 9; i++) {
            for (j = 0; j < 9; j++) {
                if (defSud.columns[i][j] == "0") {
                    defSud.columns[i][j] = num2.toString();
                }
            }
        }
    }
    
    //REMOVE A BUNCH OF THINGS
    let diff = id("diff").value;
    let numR = diff;
    let used = [];
    for (i = 0; i < numR; i++) {
        let cellRand = randomNum(81);
        if (!used.includes(cellRand)) {
            used.push(cellRand);
            //GET CELL COL / ROW
            let cellC = ((cellRand - 1) % 9);
            let cellR = Math.floor(cellRand / 9.1);
            
            defSud.columns[cellC][cellR] = "";
            defSud.rows[cellR][cellC] = "";
        }
    }
    
    //SWAP A BUNCH OF ROWS AND COLUMNS
    for (i = 0; i < 300; i++) {
        let type = randomNum(2); 
        let swapbox = randomNum(3) - 1;
        let swap1 = randomNum(3) - 1;
        let swap2 = randomNum(3) - 1;
        let col1 = swap1 + (3 * swapbox);
        let col2 = swap2 + (3 * swapbox);
        
        //console.log(" Type: ", type, "\n", "Box: ", swapbox, "\n", "Column 1: ", swap1, "\n", "Column 2: ", swap2, "\n", "Col 1: ", col1, "\n", "Col 2: ", col2);
        if (type == 2) {
            //Swap Row
            //console.log("Swapping Rows: ", col1, "&", col2, "in box", swapbox);
            let tempR = defSud.rows[col1];
            defSud.rows[col1] = defSud.rows[col2];
            defSud.rows[col2] = tempR;
            for (z = 0; z < 9; z++) {
                let tempC = defSud.columns[z][col1];
                defSud.columns[z][col1] = defSud.columns[z][col2];
                defSud.columns[z][col2] = tempC;
            }
        }
        else if (type == 1) {
            //Swap Col
            //console.log("Swapping Columns: ", col1, "&", col2, "in box", swapbox);
            let tempC1 = defSud.columns[col1];
            defSud.columns[col1] = defSud.columns[col2];
            defSud.columns[col2] = tempC1;
            for (r = 0; r < 9; r++) {
                let tempR2 = defSud.rows[r][col1];
                defSud.rows[r][col1] = defSud.rows[r][col2];
                defSud.rows[r][col2] = tempR2;
            }
        }
    }   

    //FILL BOXES
    let count = 0;
    for (j = 0; j < 3; j++) {
        for (i = 0; i < 3; i++) {
            defSud.rows[i + (3 * j)].forEach(e => {
                if (count < 3) {
                    defSud.boxes[0 + (3 * j)][count + (3 * i)] = e;
                } 
                else if (count > 2 && count < 6) {
                    defSud.boxes[1 + (3 * j)][count - 3 + (3 * i)] = e;
                }
                else if (count > 5) {
                    defSud.boxes[2 + (3 * j)][count - 6 + (3 * i)] = e;
                }
                count++;
            });
            count = 0;
        }
    }
    drawGrid(defSud);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawGrid(s) {
    grid = s;
    let count = 1;
    let rowC = 0;
    s.rows.forEach(e => {
        for (j = 0; j < 9; j++) {
            v = e[j];
            id(count).value = v;
            if (v != ""){
                id(count).setAttribute('readonly', true);
                id(count).style.backgroundColor = "rgba(200, 200, 200, 0.5)";
            }
            else {
                id(count).removeAttribute('readonly');
                id(count).style.backgroundColor = "rgba(255, 255, 255, 0.5)";
            }
            count++;
        }   
        rowC = 0;
    });
}