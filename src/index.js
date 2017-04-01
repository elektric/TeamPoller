import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../public/index.css';
// import * as firebase from 'firebase';
// var config = require('../secure/config.json');


// const fb = firebase
//   .initializeApp(config)
//   .database()
//   .ref();

  // const FApp = (props) => {
  //   console.log('snapshot', props);
  //   return (
  //     <div>
  //       <h1>My Prototype</h1>
  //       <p>{JSON.stringify(props)}</p>
  //     </div>
  //   );
  // }
  //
  // fb.on('value', snapshot => {
  //   const store = snapshot.val();
  //   ReactDOM.render(
  //     <FApp {...store} />,
  //     document.getElementById('root')
  //   );
  // });

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
