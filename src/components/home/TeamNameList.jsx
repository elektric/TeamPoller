import React from "react";
import {ListGroup, ListGroupItem} from 'react-bootstrap';


export default (props) => {

    let nameList = [];
    for (let property in props.names) {
        console.log(property, '=', props.names[property].teamName, props.names[property].votes);
        const updateCount = (e) => {
            props.clickEventHandler(property)
        }
        nameList.push(
            <ListGroupItem key={property} onClick={updateCount}>
                <div>
                    <div>{props.names[property].teamName}</div>
                    <div>{props.names[property].votes}</div>
                </div>
            </ListGroupItem>
        );
    }
    return (
        <ListGroup>
            {nameList}
        </ListGroup>
    );
};
