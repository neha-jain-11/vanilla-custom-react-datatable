import React, { Component } from "react";
const fetch = require("node-fetch");

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      filters: {}
    };
    this.update = this.update.bind(this);
    this.filter = this.filter.bind(this);
    this.reset = this.reset.bind(this);
    this.removeFilters = this.removeFilters.bind(this);
  }

  componentWillMount() {
    console.log('filters', this.props.filters);
    this.setState({ filters: this.props.filters });
  }

  update(event) {
    let val = event.target.value;
    val = isNaN(Number(val)) ? val : Number(val);
    this.setState({
      filters: { ...this.state.filters, ...{ [event.target.name]: val } }
    });
  }

  filter() {
    this.updateFilters();
  }

  reset() {
    this.props.columns.map((col, index) => {
      this.refs[col].value = "";
    });
    this.setState({ filters: {} }, this.updateFilters);

  }

  updateFilters() {
    this.props.updateFilters(this.state.filters);
  }

  removeFilters(event) {
    const col = event.target["dataset"].col;
    delete this.state.filters[col];
    this.refs[col].value = "";
    this.updateFilters();
  }

  render() {
    const filters = this.state.filters;
    console.log('filters', filters);
    return (
      <div>
        <div className="col-12 mb-3">
          <div className="dropdown" ref={(dropdown) => this.dropdown = dropdown}>
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Manage Filter
        </button>
            <div
              className={`dropdown-menu`}
              aria-labelledby="dropdownMenuButton">
              <div className="row p-4">
                <div className="col-12">
                  <div className="row">
                    {this.props.columns.map((col, index) => (
                      <div className="col-4 form-group" key={index}>
                        <label htmlFor={col} className="mb-0 text-secondary">{col}</label>
                        {
                          filters[col] ?
                            <input type="text" className="form-control p-0" name={col} ref={col} value={filters[col]} onChange={this.update} /> :
                            <input type="text" className="form-control p-0" name={col} ref={col} onChange={this.update} />
                        }
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-12 text-right mt-2">
                <button className="btn btn-primary" onClick={this.filter}>Submit</button>
                <button className="btn btn-secondary ml-2" onClick={this.reset}>Reset</button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 mb-3">
          {
            filters && Object.keys(filters).map((val, index) => (
              <span key={index} className="badge badge-pill badge-secondary pb-2">{filters[val]}
                <span data-col={val} className="ml-1 close-button" onClick={this.removeFilters}>&times;</span>
              </span>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Filter;
