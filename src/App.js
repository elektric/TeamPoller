import '../public/App.css';


//import '../public/bootstrap.css';
import React, { Component } from 'react';
import {Button, Panel, Grid, Row, Col, Glyphicon} from "react-bootstrap";
import TeamNameList from './components/home/TeamNameList.jsx';
import * as firebase from 'firebase';
import {Bar, Pie, HorizontalBar, defaults} from 'react-chartjs-2';
var config = require('../secure/config.json');


defaults.global.defaultFontColor = 'rgba(255, 255, 255, .8)';
defaults.global.defaultFontSize = 18;
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
          teamSlogan: 'not provided',
          logoURL: 'not provided',
          chartIsOpen: true,
          data: {
            labels: [],
            datasets: [
              {
                label: 'Total Votes',
                backgroundColor: 'rgba(123, 18, 229, 0.2)',
                borderColor: 'rgba(255, 255, 255, 8)',
                borderWidth: 3,
                hoverBackgroundColor: 'rgba(229, 18, 229, 0.2)',
                hoverBorderColor: 'rgba(229, 18, 229, 1)',
                data: []
              }
            ]
          },
          options: {
            maintainAspectRatio: true,
            response: true,
            legend: {
              display: false
            },

            scales: {
              yAxes: [{
                  display: true,
                  gridLines:{
                    //color:"rgba(255,255,255,0.1)",
                    //zeroLineColor:"rgba(255,255,255,0.2)"
                  },
                  ticks: {
                      suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                      // OR //
                      //beginAtZero: true   // minimum value will be 0.
                  }
              }],
              xAxes: [{
                  display: true,
                  gridLines:{
                    //color:"rgba(255,255,255,0.2)",
                    zeroLineColor:"rgba(255,255,255,0.5)"
                  },
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
        let zipped = []; //used for sorting the array
        for (let property in store.teams)
        {
          //console.log("willmountData", '=', "value=", store.teams[property], "propery= ", property);
          //teamNames.push(store.teams[property].teamName);
          //votes.push(store.teams[property].votes);
          zipped.push({teamName: store.teams[property].teamName, votes: store.teams[property].votes})
        }

        //Sort the array
        zipped.sort(function (x, y)
        {
            return y.votes - x.votes;
        });

        // unzip
        var z;
        for (var i=0; i<zipped.length; i++)
        {
            z = zipped[i];
            teamNames[i] = z.teamName;
            votes[i] = z.votes;
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
      //console.log("updating chart", this.state)

      chartDisplay = (
        <div>
          <Button bsSize="default" onClick={ ()=> this.setState({ chartIsOpen: !this.state.chartIsOpen })}>
             <Glyphicon glyph="chevron-down" />
           </Button>
           <Panel collapsible expanded={this.state.chartIsOpen}>
             <div>
               <h2 className="voteHeader">Votes for Team Name</h2>
               <Bar
                 data={this.state.data}
                 width={800}
                 height={350}
                 options={this.state.options}
               />
             </div>
           </Panel>
         </div>

      );
    }
    return (
      <div className="App">
        <Grid>
          <Row className="AppLeft">
            <Col xs={12}>
              {chartDisplay}
            </Col>
          </Row>
          <Row>
            <Col xs={8} xsOffset={2} lg={8} lgOffset={2}>
              <Panel className="TeamNameListPanel">
                <TeamNameList names={this.state.teams} clickEventHandler={this.updateChoiceCount.bind(this)}/>
              </Panel>
            </Col>
          </Row>
          <Row>
            <Col xs={6} xsOffset={3} lg={6} lgOffset={3}>
              <input className="form-control team-name-input" type="text" placeholder="Enter New Team Name" onChange={ this.handleTeamEntered.bind(this) } />
              <input className="form-control team-name-input" type="text" placeholder="Enter Team Slogan" onChange={ this.handleSloganEntered.bind(this) } />
              <input className="form-control team-name-input" type="text" placeholder="Enter Logo URL" onChange={ this.handleUrlEntered.bind(this) } />
            </Col>
          </Row>
          <Row>
            <Col xs={6} xsOffset={3} lg={6} lgOffset={3}>
              <Button className="btn btn-success team-name-input" onClick={this.sendChoiceToDatabase.bind(this)}><h4>Submit New Name</h4></Button>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

  handleTeamEntered(e){
    this.setState({suggestedTeamName: e.target.value});
  }

  handleSloganEntered(e){
    this.setState({teamSlogan: e.target.value});
  }

  handleUrlEntered(e){
    this.setState({logoURL: e.target.value});
  }

  sendChoiceToDatabase(clickEvent) {
      console.log('button clicked', this.state.suggestedTeamName);
      fb.child('teams').push({'teamName': this.state.suggestedTeamName,
                              'votes': 1,
                              'slogan': this.state.teamSlogan,
                              'logoURL': this.state.logoURL},
                              response => response);
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
