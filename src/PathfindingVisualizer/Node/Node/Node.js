import React, { Component } from "react";

import './Node.css'

export default class Node extends Component {
    render() {
        const { col, row, isStart, isFinish, isVisited } = this.props;
        const extraClassName = isFinish
            ? 'node-finish' : isStart
            ? 'node-start' : isVisited
            ? 'node-visited' : '';
        const classname = 'node ' + extraClassName
    
        return (
            <div 
            className={classname}>
            </div>
        );
    }
}


export const DEFAULT_NODE = {
    row: 0,
    col: 0
};