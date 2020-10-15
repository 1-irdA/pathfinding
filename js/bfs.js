/**
 * Search path with BFS algorithm
 */
function bfs() {
    let queue = [];
    // current position at the beginning
    let current = start;
    queue.push(current);
    current.open = true;

    while (current !== end) {
        current = queue.shift();
        if (current === end) {
            noLoop();
        }

        //current's neighbors
        let neighbors = [];
        if (current.neighbors["top"] != null) {
            neighbors.push(current.neighbors["top"]);
        }
        if (current.neighbors["right"] != null) {
            neighbors.push(current.neighbors["right"]);
        }
        if (current.neighbors["bottom"] != null) {
            neighbors.push(current.neighbors["bottom"]);
        }
        if (current.neighbors["left"] != null) {
            neighbors.push(current.neighbors["left"]);
        }

        for (neighbor of neighbors) {
            // Check if there is a wall between current cell and the current chosen neighbor
            let noWall =
                (current.neighbors["top"] == neighbor && !current.walls.top) ||
                (current.neighbors["right"] == neighbor && !current.walls.right) ||
                (current.neighbors["bottom"] == neighbor && !current.walls.bottom) ||
                (current.neighbors["left"] == neighbor && !current.walls.left);

            // neighbor is not visited and there is no wall between current cell and neighbor
            if (!neighbor.open && noWall) {
                queue.push(neighbor);
                neighbor.open = true;
                neighbor.previous = current;
            }
        }
    }

    // find path
    path = [];
    let temp = current;
    path.push(temp);
    while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }

    noFill();
    stroke(0);
    strokeWeight(size / (7 * numCells));
    beginShape();
    for (let i = 0; i < path.length; i++) {
        vertex(path[i].i * (size / numCells) + size / (2 * numCells), path[i].j * (size / numCells) + size / (2 * numCells));
    }
    endShape();
}
