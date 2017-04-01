import '../public/App.css';
import React, { Component } from 'react';
import {Button} from "react-bootstrap";
import logo from '../public/logo.svg';
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
      // this.firebase = this.props.firebase;
      // this.teams = [];
      // var defaultStorage = this.firebase.storage();
      // this.defaultDatabase = this.firebase.database();
      // console.log(this.firebase.name);  // "[DEFAULT]"
      // console.log(defaultStorage);
      // console.log(this.defaultDatabase);
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
        // ReactDOM.render(
        //   <App {...store} />,
        //   document.getElementById('root')
        // );
    });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <TeamNameList names={this.state.teams}/>
        <input type="text" onChange={ this.handleTextEntered.bind(this) } />
        <Button bsStyle="success" onClick={this.sendChoiceToDatabase.bind(this)}>Send to Database</Button>
      </div>
    );
  }

  handleTextEntered(e){
    this.setState({suggestedTeamName: e.target.value});
  }
  sendChoiceToDatabase(clickEvent) {
      console.log('button clicked', this.state.suggestedTeamName);
      fb.child('teams').push(this.state.suggestedTeamName, response => response);
  }
}

export default App;
