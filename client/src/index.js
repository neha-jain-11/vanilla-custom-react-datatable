import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { employeeReducer } from './reducers/employee';
import {
  BrowserRouter as Router,
} from "react-router-dom";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

// const element = <FontAwesomeIcon icon={faCoffee} />

const store = new createStore(employeeReducer);
const wrapper = document.getElementById("app");
ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider >,
  wrapper);