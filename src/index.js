import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import './app.css';
import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase/firebase';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
 <FirebaseContext.Provider value={new Firebase()}>
  <App/>
 </FirebaseContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
