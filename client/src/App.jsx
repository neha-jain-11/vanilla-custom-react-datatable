import CustomDataTable from "./components/state-components-redux/custom-data-table/CustomDataTable.jsx";
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
              <CustomDataTable
                tableTitle="Employee data"
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;