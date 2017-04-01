import React from "react";
import TeamName from "./TeamName.jsx";

export default class TeamNameList extends React.Component {
    render() {
        // let nameList = this.props.names.map((name, index) => {
        //         return (<TeamName name={name} key={index}/>);
        //     })
        let nameList = [];
        for (let prop in this.props.names) {
            console.log(prop, '=', this.props.names[prop]);
            nameList.push(<TeamName name={this.props.names[prop]} index={prop} key={prop} />);
        }
        return (
            <div>
                {nameList}
            </div>
        );
    }
}
