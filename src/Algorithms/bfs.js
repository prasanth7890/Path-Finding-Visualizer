export default function bfs(grid, startNode, finishNode) {
    var queue = [];
    var visitedNodes = [];
    var shortestPath = [];

    queue.push(startNode);
    visitedNodes.push(startNode);

    while(queue.length > 0) {
        var currentNode = queue.shift();

        if(currentNode === finishNode) {
            // Found the finish node, backtrack to get the shortest path
            var node = finishNode;
            while(node.previous) {
                shortestPath.unshift(node);
                node = node.previous;
            }
            shortestPath.unshift(startNode);

            return { visitedNodes, shortestPath };
        }

        var neighbors = getNeighbors(currentNode, grid);

        for(var i=0;i<neighbors.length;i++) {
            var neighbor = neighbors[i];

            if(!visitedNodes.includes(neighbor)) {
                visitedNodes.push(neighbor);
                neighbor.previous = currentNode;
                queue.push(neighbor);
            }
        }
    }

    return { visitedNodes, shortestPath };
}

function getNeighbors(node, grid) {
    var neighbors = [];
    var { row, col } = node;

    if(row > 0 && !grid[row - 1][col].isWall) {
        neighbors.push(grid[row - 1][col]);
    }

    if(row < grid.length - 1 && !grid[row + 1][col].isWall) {
        neighbors.push(grid[row + 1][col]);
    }

    if(col > 0 && !grid[row][col - 1].isWall) {
        neighbors.push(grid[row][col - 1]);
    }

    if(col < grid[0].length - 1 && !grid[row][col + 1].isWall) {
        neighbors.push(grid[row][col + 1]);
    }

    return neighbors;
}
