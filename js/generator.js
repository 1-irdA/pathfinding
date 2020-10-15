/**
 * Generate a maze
 */
function generate() {
	currentCell.visited = true;
    currentCell.highlight();
    // remove wall
    let nextCell = currentCell.moveToNeighbor();
    if(nextCell){
        nextCell.visited = true;
        stack.push(currentCell);
        currentCell = nextCell;
    } else if (stack.length > 0){
        currentCell = stack.pop();
    } else if (stack.length == 0){
        createMaze = false; // Maze is created
    }
}