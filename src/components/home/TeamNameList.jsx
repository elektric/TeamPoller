import React from "react";
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import TeamNameList from './TeamNameList';

export default (props) => {

    let nameList = [];
    for (let property in props.names) {
        console.log(property, '=', props.names[property].teamName, props.names[property].votes);
        const updateCount = (e) => {
            props.clickEventHandler([property, props.names[property].votes])
        }
        nameList.push(
<<<<<<< Updated upstream
            <ListGroupItem key={property} onClick={updateCount}>
                <div>
                    <div>{props.names[property].teamName}</div>
                    <div>{props.names[property].votes}</div>
                </div>
=======
            <ListGroupItem key={property}>
                <TeamNameList keyId={property} teamName={props.names[property]} />
>>>>>>> Stashed changes
            </ListGroupItem>
        );
    }
    return (
        <ListGroup>
            {nameList}
        </ListGroup>
    );
};
