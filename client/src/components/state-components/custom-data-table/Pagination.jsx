import React, { Component } from "react";

class Pagination extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="col-12 my-2">
        <div className="row">
          <div className="col-md-6 col-12 text-center text-md-right">
            <select name="pageSize" id="pageSize" className="mr-2 form-control-sm"
              defaultValue={this.props.config.default}
              onChange={(e) => { this.props.updateLimits({ limit: Number(e.target.value) }) }}>
              {this.props.config.limits.map((val, index) => (
                <option value={val} key={index}>{val}</option>
              ))}
            </select>
            <label htmlFor="pageSize">per page</label>
          </div>
          <div className="col-md-6 col-12 mt-4 mt-md-0 text-center text-md-left">
            {
              this.props.options.page === 1 ?
                <button id="prev" className="mr-4 px-3 btn btn-info" disabled onClick={() => { this.props.updatePage('p') }}> &lt; </button>
                :
                <button id="prev" className="mr-4 px-3 btn btn-info" onClick={() => { this.props.updatePage('p') }}> &lt; </button>
            }
            <span>{this.props.options.page} of {this.props.options.totalPages}</span>
            {
              this.props.options.page === this.props.options.totalPages ?
                <button id="next" className="ml-4 px-3 btn btn-info" disabled onClick={() => { this.props.updatePage('n') }}> &gt; </button>
                :
                <button id="next" className="ml-4 px-3 btn btn-info" onClick={() => { this.props.updatePage('n') }}> &gt; </button>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Pagination;
