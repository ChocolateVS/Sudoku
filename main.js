/*
Properly commented!

Complex Programming Techniques
- Two or more data structures, uses
    - standard variables/constants
    - booleans
    - arrays
    - objects
    
- Iteration contrl structures, sequence selection
    - for and forEach loops EVERYWHERE

- Takes input from user, checks to see whether grid is solved and returns output

- Complex Techniques
    - Uses HTML DOM as GUI, using javascript to generate elements, and styles
    - Uses classes and objects to store grid and cells - object orientated
    - Uses Types - In JS done by essentinaly just using the variables...
    
- Boundary, Data validilty
    - Using HTML form, I have disable default submit and used input type, min and max to check if data is valid
    
*/

//Selected and previously selected cells
let cell;
let previous = id("p"); 
let solved = "";

/* Recives id of element and returns the HTML DOM element */
function id(id){return document.getElementById(id)}

//Fills the empty grid object's rows columns and boxes with empty string ""
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

//Cell Class for individual cells
class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
//Grid Object
let grid = {
    rows:[[], [], [], [], [], [], [], [], []],
    columns:[[], [], [], [], [], [], [], [], []],
    boxes:[[], [], [], [], [], [], [], [], []]
}
    
//GRID DATA STRUCTURE 
/*
    GRID OBJECT
        GRID.ROWS
            ARRAY FOR EACH ROW containing 9 elements
        GRID.COLUMNS
            ARRAY FOR EACH COLUMN containing 9 elements
        GIRD.BOXES
            ARRAY FOR EACH BOX containing 9 elements
*/
//Fills Grid
fillEmpty(grid);

//Event listener to check if a cell is changed
document.querySelectorAll('.input').forEach(item => {
    item.addEventListener('input', changed, event); 
});

let nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

/* When cell changed, check whether input is a valid number between 
1 and 9, by checking if it is contained in the nums array */
function changed() {
    let e = event.target.value;
    if (nums.includes(e)) { //If Valid
        change(event.target.id, e);
    }
    else { //If invalid set cell value to empty
        id(event.target.id).value = "";
    }
}

/* Takes the cell id and converts to its row, column and box position, then adds to the grid object*/
function change(val1, val2) {
    let cellN = val1;
    let cellV = val2;
    let cellC = ((cellN - 1) % 9);
    let cellR = Math.floor(cellN / 9.1);
    let cellBC = Math.floor(cellC / 3); 
    let cellBR = Math.floor(cellR / 3); 
    let cellB = cellBC + (cellBR*3);
    let cellBX = ((cellN - 1) % 3);
    let cellBY = ((cellR) % 3);
    let cellBN = cellBX + (cellBY * 3);
 
    grid.columns[cellC][cellR] = cellV;
    grid.rows[cellR][cellC] = cellV;
    grid.boxes[cellB][cellBN] = cellV;
}

//When Cell selected, set selected cell and previously selected cell
function sel(val) {
    if (!id(val).readOnly) {
        cell = id(val);
        console.log(val);
        cell.style.backgroundColor = "rgba(150, 150, 150, 0.5)";
        previous.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    }
    previous = cell;
}

//When Number on keypad pressed, change selected cell value to number pressed
function press(val) {
    console.log(id(val));
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

//Sets all cells to empty and removes all readonly attributes
function clearGrid() {
    for (c = 1; c <= 81; c++) {
        id("cell" + c).children[0].children[0].value = "";
        id("cell" + c).children[0].children[0].style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        id("cell" + c).children[0].children[0].removeAttribute('readonly');
    }
}

//When Undo/Redo Pressed, simulate undo/redo command to undo/redo most recent input
function doUndo(){
  document.execCommand('undo', false, null);
}
function doRedo(){
  document.execCommand('redo', false, null);
}

//Generate a random number in range 
function randomNum(r) {
    return Math.floor(Math.random() * r) + 1;
}
    
//Fill each cell with a random number
function fill() {
    for (i = 0; i < 81; i++) {
        var val = randomNum(9);
        id("cell" + (i + 1)).children[0].value = val;
    }
}

//Checks Whether sudoku is completed
function check(sud) {
    let r = true;
    let c = true;
    let b = true;
    let total = 0;
    
    /*
    For Each Row, Column or Box, count the total of each number 
    If more than one of any number in a row column or box, sudoku is not complete
    */
    
    //Check Rows
    for (i = 0; i < 9; i++) {
        //Array to store the number of each element for each row
        let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        arr.length = 9;
        sud.rows[i].forEach(e => {
           if (e != "") {
               //Counts number of un-empty cells
               total++;
           }
           //increments array at index of value
           arr[e - 1] += 1; 
        });
        count = 0;
        arr.forEach(e => {
            count++;
            //If more than one of the same element invalid row
            if (e > 1) {
                console.log("Invalid Row", i, "Found: ", e, count, "'s");
                r = false;
            }    
        });
    }
    
    //Check Cols - same logic as above
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
            
    //Check Boxes - same logic as above
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
    
    //If 81 values are present, and all rows columns and boxes are valid - Sudoku is solved
    if (total == 81 && r & c & b) {
        console.log("SUDOKU SOLVED!");
        id("stat").innerHTML = "SUDOKU SOLVED!";
        id("stat").style.color = "green";
    }
    //Else, show error message
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
    //Template sudoku to shuffle
    //DefSud - definite solveable sudoku
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
    /*
    Generates 2 random numbers
    Replaces all of the first number with 0's
    Replaces all of the second number with the first 
    Replaces all of the 0's with the second number
    */
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
    /*
    Removes a random element from the grid
    Grid starts as a solveable grid so will always be solveable
    */
    let diff = id("diff").value;
    let numR = diff;
    let used = [];
    for (i = 0; i < numR; i++) {
        let cellRand = randomNum(81); //Random cell
        if (!used.includes(cellRand)) {
            used.push(cellRand); //Array to store already removed cells
            //GET CELL COL / ROW
            let cellC = ((cellRand - 1) % 9);
            let cellR = Math.floor(cellRand / 9.1);
            
            defSud.columns[cellC][cellR] = "";
            defSud.rows[cellR][cellC] = "";
        }
    }
    
    //SWAP A BUNCH OF ROWS AND COLUMNS
    /*
    Selects randomly between row/column to swap
    Generates a random row or column within a box to swap
    Adds all elements from row 1 to temp array
    Adds all elements from row 2 to row 1
    Adds all elements from temp array to row 1
    
    Repeats 300 times to ensure it is well shuffled
    */
    for (i = 0; i < 300; i++) {
        let type = randomNum(2); //Row or Column
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
    //Populates the boxes object, with using rows object
    //Gets the first three elements of the first, second and third rows, then 3rd 4th and 5th elements of each row and adds to box array
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

//Get random number between min and max values
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Updates each html element with its value from the grid object
function drawGrid(s) {
    grid = s;
    let count = 1;
    let rowC = 0;
    /*
    For each row, For each element, get the elements value. 
    If cell is empty, set readonly property to false else if cell is default, set background color, and readonly to true
    */
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