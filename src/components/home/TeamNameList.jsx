import React from "react";
import {ListGroup, ListGroupItem} from 'react-bootstrap';


export default (props) => {
    let nameList = [];
    for (let property in props.names) {
        console.log(property, '=', props.names[property]);
        nameList.push(
            <ListGroupItem key={property}>
                <div>TeamName: {props.names[property]}</div>
                <div>{property}</div>
            </ListGroupItem>
        );
    }
    return (
        <ListGroup>
            {nameList}
        </ListGroup>
    );
};
