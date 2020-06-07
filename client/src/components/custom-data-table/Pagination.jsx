import React, { Component } from "react";
const fetch = require("node-fetch");

class Pagination extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="col-8 text-center mb-4 col-offset-4">
        <select name="pageSize" id="pageSize" className="mr-2 form-control-sm">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select> <label htmlFor="pageSize" className="mr-5">per page</label>
        <button className="mr-4 px-3 btn btn-info"> &lt; </button>
        <span>1 of 2</span>
        <button className="ml-4 px-3 btn btn-info"> &gt; </button>
      </div>
    );
  }
}

export default Pagination;
