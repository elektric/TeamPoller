import React from 'react';
import Increment from '../common/buttons/Increment';
import Decrement from '../common/buttons/Decrement';

export default (props) => {
    return (
        <div>
            <span style={{float: 'left'}}>
                <Decrement handleClick={props.decrementCount}/>
            </span>
            <span style={{float: 'right'}}>
                <Increment handleClick={props.incrementCount}/>
            </span>
            <div style={{textAlign: 'center'}}>
                <div>TeamName: {props.teamName}</div>
                <div>Votes: {props.votes}</div>    
            </div>
        </div>
    );
};