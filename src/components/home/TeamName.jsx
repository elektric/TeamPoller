import React from 'react';
import Increment from '../common/buttons/Increment';
import Decrement from '../common/buttons/Decrement';

export default (props) => {
    return (
        <div>
            <span style={{float: 'left'}}>+</span>
            <span style={{float: 'right'}}>-</span>
            <span>TeamName: {props.teamName}</span>
            <div>{props.keyId}</div>    
        </div>
    );
};