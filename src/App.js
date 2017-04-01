import '../public/App.css';
import React, { Component } from 'react';
import {Button, Panel, Grid, Row, Col} from "react-bootstrap";
// import logo from '../public/logo.svg';
import TeamNameList from './components/home/TeamNameList.jsx'
import * as firebase from 'firebase';
var config = require('../secure/config.json');
const fb = firebase
  .initializeApp(config)
  .database()
  .ref();


class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          teams: [],
          suggestedTeamName: '',
      };
    }
  componentWillMount() {


    fb.on('value', snapshot => {
        const store = snapshot.val();
        console.log('Snapshot', store.teams);
        this.setState({teams: store.teams});
    });
  }
  render() {
    return (
      <div className="App">
        <Grid>
          <Row>
            <Col xs={6} xsOffset={3}>
              <Panel className="TeamNameListPanel" header={(<h1>Team Name Suggestions</h1>)}>
                <TeamNameList names={this.state.teams} clickEventHandler={this.updateChoiceCount.bind(this)}/>
              </Panel>
            </Col>
            </Row>
        </Grid>
        <input type="text" onChange={ this.handleTextEntered.bind(this) } />
        <Button bsStyle="success" onClick={this.sendChoiceToDatabase.bind(this)}>Suggest New Name</Button>
      </div>
    );
  }

  handleTextEntered(e){
    this.setState({suggestedTeamName: e.target.value});
  }
  sendChoiceToDatabase(clickEvent) {
      console.log('button clicked', this.state.suggestedTeamName);
      fb.child('teams').push({'teamName': this.state.suggestedTeamName, 'votes': 1}, response => response);
  }
  updateChoiceCount(property, action) {
      console.log('list item clicked', property, action);
      //fb.child('teams/' + clickEvent + '/teamName').set("name of the thingy", response => response);
      console.log(property, this.state.teams)
      switch(action){
        case 'decrement':
          if (this.state.teams[property].votes > 0){
            fb.child('teams/' + property + '/votes').set(--this.state.teams[property].votes, response => response);
          }
          break;
        case 'increment':
          fb.child('teams/' + property + '/votes').set(++this.state.teams[property].votes, response => response);
          break;

      }

      //fb.child('teams').push(this.state.suggestedTeamName, response => response);
  }
}

export default App;
