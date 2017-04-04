import React from "react";
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import TeamName from './TeamName';

export default (props) => {

    let nameList = [];
    for (let property in props.names) {
        //console.log(property, '=', props.names[property].teamName, props.names[property].votes);
        const incrementCount = (e) => {
            props.clickEventHandler(property, 'increment');
        }
        const decrementCount = (e) => {
            props.clickEventHandler(property, 'decrement');
        }
        nameList.push(
            <ListGroupItem key={property}>
                <TeamName
                    incrementCount={incrementCount}
                    decrementCount={decrementCount}
                    teamName={props.names[property].teamName}
                    votes={props.names[property].votes}
                    slogan={props.names[property].slogan}
                    logoURL={props.names[property].logoURL}
                     />
            </ListGroupItem>
        );
    }
    return (
        <ListGroup>
            {nameList}
        </ListGroup>
    );
};

 /*<ListGroupItem key={property}>
                <TeamNameList keyId={property} teamName={props.names[property]} />*/

/*<div>
                    <div>{props.names[property].teamName}</div>
                    <div>{props.names[property].votes}</div>
                </div>*/
