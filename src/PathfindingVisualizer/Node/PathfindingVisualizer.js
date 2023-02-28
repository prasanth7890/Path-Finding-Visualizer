// import React, {Component} from "react";
// import Node from "./Node/Node";
// import { dijkstra } from "../../Algorithms/dijkstra";

// //CSS
// import './PathfindingVisualizer.css'

// const START_NODE_ROW = 10;
// const START_NODE_COL = 15;
// const FINISH_NODE_ROW = 10;
// const FINISH_NODE_COL = 35;


// export default class PathfindingVisualizer extends Component {
//     constructor(props) {
//         super(props);
//         this.state={
//             grid: [],
//         };
//     }

//     componentDidMount() {
//         const grid = getInitialGrid();
//         this.setState({grid});
//     }


//     animateDijkstra(visitedNodesInOrder) {
//         for (let i = 0; i < visitedNodesInOrder.length; i++) {
//             console.log('outer i : '+ i)
//             setTimeout(() => {
//                 const node = visitedNodesInOrder[i];
//                 const newGrid = this.state.grid.slice();
//                 const newNode = {
//                     ...node,
//                     isVisited: true,
//                 };
//                 newGrid[node.row][node.col] = newNode;
//                 console.log('Inner i : '+ i);
//                 this.setState({grid: newGrid});
//             }, 1000 * i);
                
//         }
//     }
    

//     visualizerDijkstra() {
//         const {grid} = this.state;
//         const startNode = grid[START_NODE_ROW][START_NODE_COL];
//         const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
//         const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
//         this.animateDijkstra(visitedNodesInOrder);
//     }

        
//     render() {
//         const {grid} = this.state;
//         return (
//             <>
//             <button onClick={()=>this.visualizerDijkstra()}>Visualize Dijkstra's Algorithm</button>

//              <div className="grid">
//                 {
//                     grid.map((row, rowIdx)=>{
//                         return (
//                         <div key={rowIdx}>
//                             {row.map((node, nodeIdx)=> {
//                                 const {row, col, isStart, isFinish, isVisited}=node;
//                                 return (
//                                     <Node
//                                         col={col}
//                                         row={row}
//                                         key={nodeIdx}
//                                         isStart={isStart}
//                                         isFinish={isFinish}
//                                         isVisited={isVisited}
//                                     ></Node>
//                                 )
//                             })}
//                         </div>
//                         )
//                     })
//                 }
//              </div>
//             </>
//         );
//     }
// }


// const getInitialGrid=()=>{
//     const grid = [];
//     for (let row = 0; row < 20; row++) {
//         const currRow = [];
//         for (let col = 0; col < 50; col++) {
//             currRow.push(createNode(col, row));
//         }
//         grid.push(currRow);
//     }
//     return grid;
// };

// const createNode = (col, row) => {
//     return {
//         col,
//         row, 
//         isStart: row === START_NODE_ROW &&  col === START_NODE_COL,
//         isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
//         distance: Infinity,
//         isVisited: false,
//         isWall: false,
//         previousNode: null
//     };
// };


import React, {Component} from 'react';
import Node from './Node/Node';
// import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import { dijkstra, getNodesInShortestPathOrder } from '../../Algorithms/dijkstra';
import { astar } from '../../Algorithms/astar';
import bfs from '../../Algorithms/bfs';
import dfs from '../../Algorithms/dfs';

import './PathfindingVisualizer.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
    
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeAstar() {
    const {grid} = this.state;
    getNodeNeighbors(grid);
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const result=astar(grid, startNode, finishNode);
    console.log(result.closedSet, result.path);
    this.animateDijkstra(result.closedSet, result.path);
  }

  visualizeBFS() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const result = bfs(grid, startNode, finishNode);
    console.log(result.visitedNodes, result.shortestPath);
    this.animateDijkstra(result.visitedNodes, result.shortestPath);
  }

  visualizeDFS() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const result = dfs(grid, startNode, finishNode);
    console.log(result.visitedNodes, result.shortestPath);
    this.animateDijkstra(result.visitedNodes, result.shortestPath);
  }

  getMaze() {
    const {grid} =  this.state;
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        const node = grid[row][col];
        if (Math.random() < 0.3) {
          node.isWall = true;
        }
      }
    }
    grid[START_NODE_ROW][START_NODE_COL].isWall = false;
    grid[FINISH_NODE_ROW][FINISH_NODE_COL].isWall = false;
    this.setState({grid});
  }

  render() {
    const {grid, mouseIsPressed} = this.state;
    return (
      <>
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>
        <button onClick={() => this.visualizeAstar()}>
          Visualize AStar Algorithm
        </button>
        <button onClick={() => this.visualizeBFS()}>
          Visualize BFS Algorithm
        </button>
        <button onClick={() => this.visualizeDFS()}>
          Visualize DFS Algorithm
        </button>
        <button onClick={() => this.getMaze()}>
          Maze
        </button>
        <div className="grid">
          
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall,f,g,h,neighbors, zero, addNeighbors, previous} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      f={f}
                      g={g}
                      h={h}
                      previous={previous}
                      neighbors={neighbors}
                      zero={zero}
                      addNeighbors={addNeighbors}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      let Node = createNode(col, row);
      currentRow.push(Node);
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    // A*
    f: 0,
    g: 0,
    h: 0,
    neighbors: [],
    zero: 0,
    previous: undefined,

    addNeighbors: function(grid) {
      var i = this.row;
      var j = this.col;
      if (i < 19) {
        this.neighbors.push(grid[i + 1][j]);
      }
      if (i > this.zero) {
        this.neighbors.push(grid[i - 1][j]);
      }
      if (j < 49) {
        this.neighbors.push(grid[i][j + 1]);
      }
      if (j > this.zero) {
        this.neighbors.push(grid[i][j - 1]);
      }
    },

  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNodeNeighbors = (grid) => {
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 50; col++) {
      grid[row][col].addNeighbors(grid);
    }
  }
}
