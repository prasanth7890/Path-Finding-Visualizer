export function astar(grid, startNode, finishNode) {
    var openSet = [];
    var closedSet = [];
    var path = [];

    openSet.push(startNode);

    while(openSet.length > 0) {
        // Best Option
        var winner = 0;
        for(var i=0;i<openSet.length;i++) {
            if(openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }

        var current = openSet[winner];

        //Did i finish?
        if(current === finishNode) {
            
            var temp = current;
            path.push(temp);
            while(temp.previous) {
                path.push(temp.previous);
                temp = temp.previous;
            }

            console.log('DONE!');
            return {closedSet, path};
        }

        removeFromArray(openSet, current);
        closedSet.push(current);

        var neighbors = current.neighbors;
        for(var j=0; j<neighbors.length;j++) {
            var neighbor = neighbors[j];            
            if(!closedSet.includes(neighbor) && !neighbor.isWall) {
                var tempG = current.g + 1;
                if(openSet.includes(neighbor)) {
                    if(tempG < neighbor.g) {
                        neighbor.g = tempG;
                        neighbor.f = neighbor.g + neighbor.h;
                        neighbor.previous = current;
                    }
                }
                else {
                    neighbor.g = tempG;
                    neighbor.h = heuristic(neighbor, finishNode);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                    if (!openSet.includes(neighbor)) {
                        openSet.push(neighbor);
                    }
                }
            }
        }
    }
    console.log('NO PATH FOUND!');
    return {closedSet, path};
}

function removeFromArray(arr, ele) {
    for(var i = arr.length-1;i>=0;i--) {
        if(arr[i] === ele) {
            arr.splice(i, 1);
        }
    }
}

function heuristic(nodeOne, nodeTwo) {
    let xOne = nodeOne.row;
    let xTwo = nodeTwo.row;
    let yOne = nodeOne.col;
    let yTwo = nodeTwo.col;
    
    let xChange = Math.abs(xOne - xTwo);
    let yChange = Math.abs(yOne - yTwo);
    
    return (xChange + yChange);
}


