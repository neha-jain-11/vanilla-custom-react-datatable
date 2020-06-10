import Main from "./components/hooks-components/custom-data-table/Main.jsx";
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
        <div id="app-router" className="card m-4">
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