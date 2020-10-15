/**
 * A Star algorithm
 */
function aStar() {
    // current position
	let current;
    if(openSet.length > 0){
        // getting element with lowest f value in the worst way possible
        let lowestIndex = 0;
        for(let i = 0; i < openSet.length; i++){ // heap should be used. not linear search
            if(openSet[i].f < openSet[lowestIndex].f){
                lowestIndex = i;
            }
        }
        current = openSet[lowestIndex];

        if(current === end){
            noLoop();
        }

        // current is visited so remove it from openSet and add it to closedSet
        removeElt(openSet, current);
        closedSet.push(current);

        //current's neighbors
        let neighbors = [];
        if (current.neighbors['top'] != null) {
            neighbors.push(current.neighbors['top']);
        }
        if (current.neighbors['right'] != null) {
            neighbors.push(current.neighbors['right']);
        }
        if (current.neighbors['bottom'] != null) {
            neighbors.push(current.neighbors['bottom']);
        }
        if (current.neighbors['left'] != null) {
            neighbors.push(current.neighbors['left']);
        }

        let noWall;
        for (neighbor of neighbors){
            // Check if there is a wall between current cell and the current chosen neighbor
            noWall = (current.neighbors['top'] == neighbor && !current.walls.top)
                    || (current.neighbors['right'] == neighbor && !current.walls.right)
                    || (current.neighbors['bottom'] == neighbor && !current.walls.bottom)
                    || (current.neighbors['left'] == neighbor && !current.walls.left);

            // neighbor is not visited and there is no wall between current cell and neighbor
            if(!closedSet.includes(neighbor) && noWall) {
                // distance between two cells is '1'. Hence adding 1.
                let tempGScore = current.g + 1;
                let newPath = false;
                if(openSet.includes(neighbor)) { // have seen 'neighbor' before
                    // update only if this path is better
                    if(tempGScore < neighbor.g) {
                        neighbor.g = tempGScore;
                        newPath = true;
                    }
                } else {
                    neighbor.g = tempGScore;
                    newPath = true;
                    openSet.push(neighbor);
                }
                if(newPath){
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            }
        }
    } else {
        noLoop();
    }

    // find path
    path = [];
    let temp = current;
    path.push(temp);
    while(temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }

    noFill();
    stroke(0);
    strokeWeight(size/(7*numCells));
    beginShape();
    for (let i = 0; i<path.length; i++) {
    	vertex(path[i].i*(size/numCells) + (size/(2*numCells)), path[i].j*(size/numCells) + (size/(2*numCells)));	
    }
    endShape();

}

/**
 * Remove an alt from an array
 * @param {*} array array with elements
 * @param {*} elt to remove
 */
function removeElt(array, toRemove){
  for(let i = array.length - 1; i >= 0; i--){
    if(array[i] == toRemove){
      array.splice(i, 1);
      break;
    }
  }
}

/**
 * Get distance
 * @param {*} a abs
 * @param {*} b ord
 */
function heuristic(a, b){
    return dist(a.i,a.j,b.i,b.j);
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
