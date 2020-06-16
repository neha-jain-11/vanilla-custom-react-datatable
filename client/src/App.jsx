import CustomDataTable from "./components/state-components-router/custom-data-table/CustomDataTable.jsx";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

export const Wrap1 = () => (
  <CustomDataTable
    tableTitle="Home Employee data"
  />
);

export const Wrap2 = () => (
  <CustomDataTable
    tableTitle="Test Employee data"
  />
);

export const Wrap3 = () => (
  <div> root</div>
)
class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="app-router" className="card m-4">
        <Router>
          <Link to='/home'> home home </Link>
          <Link to='/test'> test test </Link>
          <Switch>
            <Route path='/home'>
              <Wrap1 />
            </Route>
            <Route path='/test'>
              <Wrap2 />
            </Route>
            <Route path='/'>
              <Wrap3 />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;