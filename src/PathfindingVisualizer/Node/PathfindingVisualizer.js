import React, {Component} from "react";
import Node from "./Node/Node";
import { dijkstra } from "../../Algorithms/dijkstra";

//CSS
import './PathfindingVisualizer.css'

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;


export default class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state={
            grid: [],
        };
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({grid});
    }


    animateDijkstra(visitedNodesInOrder) {
        for (let i=0; i < visitedNodesInOrder.length; i++) {
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                const newGrid = this.state.grid.slice()
                const newNode = {
                    ...node,
                    isVisited: true,
                };
                newGrid[node.row][node.col] = newNode;
                console.log(i)
                this.setState({grid: newGrid});
            }, 1000 * i);
                
        }
    }
    

    visualizerDijkstra() {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        this.animateDijkstra(visitedNodesInOrder);
    }

        
    render() {
        const {grid} = this.state;
        return (
            <>
            <button onClick={()=>this.visualizerDijkstra()}>Visualize Dijkstra's Algorithm</button>

             <div className="grid">
                {
                    grid.map((row, rowIdx)=>{
                        return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx)=> {
                                const {row, col, isStart, isFinish, isVisited}=node;
                                return (
                                    <Node
                                        col={col}
                                        row={row}
                                        key={nodeIdx}
                                        isStart={isStart}
                                        isFinish={isFinish}
                                        isVisited={isVisited}
                                    ></Node>
                                )
                            })}
                        </div>
                        )
                    })
                }
             </div>
            </>
        );
    }
}


const getInitialGrid=()=>{
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currRow = [];
        for (let col = 0; col < 50; col++) {
            currRow.push(createNode(col, row));
        }
        grid.push(currRow);
    }
    return grid;
};

const createNode = (col, row) => {
    return {
        col,
        row, 
        isStart: row === START_NODE_ROW &&  col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null
    };
};


