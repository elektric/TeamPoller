import React from "react";

export default class TeamName extends React.Component {
    render() {
        return (
            <div>
                <div>TeamName: {this.props.name}</div>
                <div>{this.props.index}</div>
                <br/>
                <br/>
            </div>
        );
    }
}
