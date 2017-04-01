import React from "react";
import {ListGroup, ListGroupItem} from 'react-bootstrap';


export default (props) => {

    let voteList = [];
    for (let property in props.names) {
        console.log("adding vote", '=', props.names[property].teamName, props.names[property].votes);
        const updateCount = (e) => {
            props.clickEventHandler([property, props.names[property].votes])
        }
        voteList.push({'teameName':props.names[property].teamName, 'votes':props.names[property].votes});
    }
    return (
        <ListGroup>
            {nameList}
        </ListGroup>
    );
};
