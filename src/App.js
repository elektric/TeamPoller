import '../public/App.css';


//import '../public/bootstrap.css';
import React, { Component } from 'react';
import {Button, Panel, Grid, Row, Col} from "react-bootstrap";
import TeamNameList from './components/home/TeamNameList.jsx';
import * as firebase from 'firebase';
import {Bar, Pie, HorizontalBar} from 'react-chartjs-2';
var config = require('../secure/config.json');
const fb = firebase
  .initializeApp(config)
  .database()
  .ref();


//sample data
class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          teams: [],
          suggestedTeamName: '',
          hasData: false,
          data: {
            labels: [],
            datasets: [
              {
                label: 'Total Votes',
                backgroundColor: 'rgba(123, 18, 229, 0.2)',
                borderColor: 'rgba(123, 18, 229, 1)',
                borderWidth: 3,
                hoverBackgroundColor: 'rgba(229, 18, 229, 0.2)',
                hoverBorderColor: 'rgba(229, 18, 229, 1)',
                data: []
              }
            ]
          },
          options: {
            maintainAspectRatio: true,
            legend: {
              display: false
            },
            scales: {
              yAxes: [{
                  display: true,
                  ticks: {
                      suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                      // OR //
                      //beginAtZero: true   // minimum value will be 0.
                  }
              }],
              xAxes: [{
                  display: true,
                  ticks: {
                      suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                      // OR //
                      //beginAtZero: true   // minimum value will be 0.
                  }
              }],
          },
        },
      };
    }
  componentWillMount() {


    fb.on('value', snapshot => {
        console.log("data before: ", this.state.data.datasets[0].data);
        const store = snapshot.val();
        //console.log('Snapshot', store.teams);
        let teamNames = [];
        let votes = [];
        for (let property in store.teams)
        {
          //console.log("willmountData", '=', "value=", store.teams[property], "propery= ", property);
          teamNames.push(store.teams[property].teamName);
          votes.push(store.teams[property].votes);
        }


        let datasets = this.state.data.datasets.slice();
        datasets[0].data = votes;
        let data = Object.assign({}, this.state.data, { datasets: datasets, labels: teamNames});
        this.setState(Object.assign({}, this.state, {teams: store.teams, data: data, hasData: true}));
        console.log("data After: ", this.state.data.datasets[0].data);


    });
  }
  render() {
    let chartDisplay = null;
    if(this.state.hasData)
    {
      console.log("updating chart", this.state)
      chartDisplay = (
        <div>
          <h2 className="voteHeader">Votes for Team Name</h2>
          <HorizontalBar
            data={this.state.data}
            width={500}
            height={200}
            options={this.state.options}
          />
        </div>
      );
    }
    return (
      <div className="App">
        <Grid>
          <Row>
            <Col xs={12} lg={8} lgOffset={2}>
              <Panel className="TeamNameListPanel" header={(<h1>Team Name Suggestions</h1>)}>
                <TeamNameList names={this.state.teams} clickEventHandler={this.updateChoiceCount.bind(this)}/>
              </Panel>
            </Col>
          </Row>
          <Row>
            <Col xs={10} xsOffset={1} lg={6} lgOffset={3}>
              <input className="form-control team-name-input" type="text" placeholder="Enter New Team Name" onChange={ this.handleTextEntered.bind(this) } />
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={6} lgOffset={3}>
              <Button className="btn btn-primary team-name-input" onClick={this.sendChoiceToDatabase.bind(this)}>Suggest New Name</Button>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              {chartDisplay}
            </Col>
          </Row>
        </Grid>
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

      //fb.child('teams/' + clickEvent + '/teamName').set("name of the thingy", response => response);
      //console.log(property, this.state.teams)
      switch(action){
        case 'decrement':
          if (this.state.teams[property].votes > 0){
            fb.child('teams/' + property + '/votes').set(--this.state.teams[property].votes, response => response);
          }
          break;
        case 'increment':
          fb.child('teams/' + property + '/votes').set(++this.state.teams[property].votes, response => response);
          break;
        default:
          console.log("illegal operation: ", action);
          break;

      }

      //fb.child('teams').push(this.state.suggestedTeamName, response => response);
  }
}

export default App;
