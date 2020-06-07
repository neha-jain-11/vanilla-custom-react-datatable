import React, { Component } from "react";
const fetch = require("node-fetch");

class Pagination extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="col-8 text-center mb-4 col-offset-4">
        <select name="pageSize" id="pageSize" className="mr-2 form-control-sm"
          defaultValue={this.props.config.default}
          onChange={(e) => { this.props.updateLimits({ limit: Number(e.target.value) }) }}>
          {this.props.config.limits.map((val, index) => (
            <option value={val} key={index}>{val}</option>
          ))}
        </select> <label htmlFor="pageSize" className="mr-5">per page</label>
        {
          this.props.options.page === 1 ?
            <button className="mr-4 px-3 btn btn-info" disabled onClick={() => { this.props.updatePage('p') }}> &lt; </button>
            :
            <button className="mr-4 px-3 btn btn-info" onClick={() => { this.props.updatePage('p') }}> &lt; </button>
        }
        <span>{this.props.options.page} of {this.props.options.totalPages}</span>
        {
          this.props.options.page === this.props.options.totalPages ?
            <button className="ml-4 px-3 btn btn-info" disabled onClick={() => { this.props.updatePage('n') }}> &gt; </button>
            :
            <button className="ml-4 px-3 btn btn-info" onClick={() => { this.props.updatePage('n') }}> &gt; </button>
        }
      </div>
    );
  }
}

export default Pagination;
