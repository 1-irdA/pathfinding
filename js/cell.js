/**
 * Class who define cells
 */
class Cell {

    /**
     * Set a cell at initial state
     * @param {*} i abs
     * @param {*} j ord
     */
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        // walls of cell
        this.walls = {
            top: true,
            bottom: true,
            right: true,
            left: true,
        };
        // neighbors of cell
        this.neighbors = {
            top: null,
            right: null,
            bottom: null,
            left: null
        };
        this.visited = false;
        this.previous = undefined;

        /**
         * Show cell
         */
        this.show = function () {
            let x = this.i * cellSize;
            let y = this.j * cellSize;
            stroke(0);
            strokeWeight(2);
            // if cell have a wall, display it
            if (this.walls.top) {
                line(x, y, x + cellSize, y);
            }
            if (this.walls.right) {
                line(x + cellSize, y, x + cellSize, y + cellSize);
            }
            if (this.walls.bottom) {
                line(x + cellSize, y + cellSize, x, y + cellSize);
            }
            if (this.walls.left) {
                line(x, y + cellSize, x, y);
            }
            // if cell was visited by generate maze algorithm
            if (this.visited) {
                fill(255, 204, 0);
                noStroke();
                rect(x, y, cellSize, cellSize);
            }
        };

        /**
         * Highlight current cell
         */
        this.highlight = function () {
            let x = this.i * cellSize;
            let y = this.j * cellSize;
            noStroke();
            fill(255, 0, 0);
            rect(x, y, cellSize, cellSize);
        };

        /**
         * Display point to the end of the maze
         */
        this.showEnd = function() {
            let x = this.i * cellSize;
            let y = this.j * cellSize;
            noStroke();
            fill(0);
            circle(x + cellSize / 2, y + cellSize / 2, cellSize / 2);
        };

        /**
         * Add neighbors to the current cell
         */
        this.addNeighbors = function () {
            // if cell have a neighbor at top, right, bottom, left
            if (this.neighbors.top == null) {
                this.neighbors.top = grid[getIndex(i, j - 1)];
            }
            if (this.neighbors.right == null) {
                this.neighbors.right = grid[getIndex(i + 1, j)];
            }
            if (this.neighbors.bottom == null) {
                this.neighbors.bottom = grid[getIndex(i, j + 1)];
            }
            if (this.neighbors.left == null) {
                this.neighbors.left = grid[getIndex(i - 1, j)];
            }
        };

        /**
         * Move to neighbors current cell
         */
        this.moveToNeighbor = function () {
            let neighborsList = [];
            let top = this.neighbors.top;
            let right = this.neighbors.right;
            let left = this.neighbors.left;
            let bottom = this.neighbors.bottom;
            if (top && !top.visited) {
                neighborsList.push(top);
            }
            if (right && !right.visited) {
                neighborsList.push(right);
            }
            if (bottom && !bottom.visited) {
                neighborsList.push(bottom);
            }
            if (left && !left.visited) {
                neighborsList.push(left);
            }
            if (neighborsList.length > 0) {
                let r = floor(random(0, neighborsList.length));
                if (top && neighborsList[r].i === top.i && neighborsList[r].j === top.j) {
                    this.walls.top = false;
                    grid[getIndex(top.i, top.j)].walls.bottom = false;
                }
                else if (right && neighborsList[r].i === right.i && neighborsList[r].j === right.j) {
                    this.walls.right = false;
                    grid[getIndex(right.i, right.j)].walls.left = false;
                }
                else if (bottom && neighborsList[r].i === bottom.i && neighborsList[r].j === bottom.j) {
                    this.walls.bottom = false;
                    grid[getIndex(bottom.i, bottom.j)].walls.top = false;
                }
                else if (left && neighborsList[r].i === left.i && neighborsList[r].j === left.j) {
                    this.walls.left = false;
                    grid[getIndex(left.i, left.j)].walls.right = false;
                }
                return neighborsList[r];
            }
            return undefined;
        };
    }
}

/**
 * Get cell index
 * @param {*} i abs
 * @param {*} j ord
 */
function getIndex(i, j) {
    if(i < 0 || j < 0 || i > numCells - 1 || j > numCells - 1) { 
        return -1; 
    }
    return i * numCells + j;
}
