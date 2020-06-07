import Main from "./components/custom-data-table/Main.jsx";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router>
        <div id="app-router">
          <Switch>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;