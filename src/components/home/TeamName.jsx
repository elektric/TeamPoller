import React from 'react';
import Increment from '../common/buttons/Increment';
import Decrement from '../common/buttons/Decrement';
import {Grid, Row, Col} from "react-bootstrap";

export default (props) => {
    // return (
    //     <div>
    //         <span style={{float: 'left'}}>
    //             <Decrement handleClick={props.decrementCount}/>
    //         </span>
    //         <span style={{float: 'right'}}>
    //             <Increment handleClick={props.incrementCount}/>
    //         </span>
    //         <div style={{textAlign: 'center'}}>
    //             <div>{props.teamName}</div>
    //             <div>{props.votes}</div>
    //             <div>{props.slogan}</div>
    //             <div>
    //                 <img src={props.logoURL} alt="Team Logo Missing" style={{width:'250px'}}/>
    //             </div>
    //         </div>
    //     </div>
    // );
    return (
        <Grid>
          <Row>
            <Col xs={2} lg={2} lgOffset={0}>
                <Decrement handleClick={props.decrementCount}/>
                <h4>Slogan</h4>
                <h3>{props.slogan}</h3>
            </Col>

            <Col xs={3} lg={3} lgOffset={0}>
              <div>{props.teamName}</div>
              <img src={props.logoURL} alt="Team Logo Missing" style={{width:'250px'}}/>
            </Col>

            <Col xs={2} lg={2} lgOffset={0}>
              <Increment handleClick={props.incrementCount}/>
              <h4>Votes</h4>
              <h1>{props.votes}</h1>
            </Col>

          </Row>
      </Grid>
    );
};
