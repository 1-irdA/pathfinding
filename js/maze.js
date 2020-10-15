let pathfindindChoice = document.getElementById("pathfindingSelect");

let size = 600;         // side size of grid
let numCells = 15;      // number of cells in a row

let cellSize;           // size of side of cell 
let grid = [];          // 1D array for maze
let currentCell;        // for generate maze
let stack = [];         // for generate maze

let start, end;         // start & end of maze
let openSet = [];       // cells to visit
let closedSet = [];     // visited cells
let path = [];          // path to exit 
let createMaze;         

/**
 * Set canvas and create maze
 */
function setup() {
    createCanvas(size, size);
    cellSize = size / numCells;
    // add cell in grid
    for(let i = 0; i < numCells; i++){
        for(let j = 0; j < numCells; j++){
            let cell = new Cell(i, j);
            grid.push(cell);
        }
    }

    currentCell = grid[0]; // start maze generation with first column and first row cell.

    // for each cells add neighbors
    for(let i = 0; i < numCells; i++){
        for(let j = 0; j < numCells; j++){
            grid[i*numCells+j].addNeighbors();
        }
    }
    createMaze = true;

    start = grid[0]; 
    end = grid[numCells*numCells-1]; 
    openSet.push(start);
}

/**
 * Draw function (main)
 */
function draw() {

    background(0);

    for(let i = 0; i < grid.length; i++){
        grid[i].show();
    }

    if(createMaze){ 
        generate();         
    } else { 
        end.showEnd();      
        if (pathfindindChoice.value == "astar") {
            aStar();            
        } else if (pathfindindChoice.value == "bfs") {
            bfs();
        } else if (pathfindindChoice.value == "dfs") {
            dfs();
        }
        
    }
}