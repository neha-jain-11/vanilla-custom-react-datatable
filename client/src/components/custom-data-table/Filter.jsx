import React, { Component } from "react";
import Dropdown from "../atoms/Dropdown.jsx";
const fetch = require("node-fetch");

class Filter extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div className="col-12 mb-3">
          <Dropdown />
        </div>

        <div className="col-12 mb-3">
          <span className="badge badge-pill badge-secondary pb-2">Filter applied<span className="ml-1 close-button">&times;</span></span>
        </div>
      </div>
    );
  }
}

export default Filter;
