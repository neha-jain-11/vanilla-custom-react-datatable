import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import {
  BrowserRouter as Router,
} from "react-router-dom";

const wrapper = document.getElementById("app");
ReactDOM.render(<App />, wrapper);