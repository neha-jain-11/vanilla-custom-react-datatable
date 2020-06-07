import React, { Component } from "react";
const fetch = require("node-fetch");
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faFilter } from '@fortawesome/free-solid-svg-icons'
class Filter extends Component {
  constructor() {
    super();
    this.state = {
      filters: {}
    };
    this.update = this.update.bind(this);
    this.reset = this.reset.bind(this);
    this.removeFilters = this.removeFilters.bind(this);
  }

  componentWillMount() {
    this.setState({ filters: this.props.filters });
  }

  update(event) {
    let val = event.target.value;
    if (val) {
      val = isNaN(Number(val)) ? val : Number(val);
      this.setState({
        filters: { ...this.state.filters, ...{ [event.target.name]: val } }
      }, this.updateFilters);
    } else {
      delete this.state.filters[event.target.name];
      this.updateFilters();
    }
  }

  reset() {
    this.props.columns.map((col, index) => {
      this.refs[col.name].value = "";
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
    return (
      <div className="col-12 mb-3">
        <div className="row">
          <div className="col-md-8 col-12 order-2 order-md-1 mb-3 mb-md-0">
            {
              filters && Object.keys(filters).map((val, index) => (
                <span key={index} className="badge badge-pill badge-secondary pb-2">
                  <span className="badgeValue">{filters[val]}</span>
                  <FontAwesomeIcon data-col={val} icon={faTimesCircle} className="ml-1 close-button text-danger" onClick={this.removeFilters} />

                </span>
              ))
            }
          </div>
          <div className="col-md-4 col-12 order-1 order-md-2 mb-3 mb-md-0 text-right">
            <div className="dropdown" ref={(dropdown) => this.dropdown = dropdown}>
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <FontAwesomeIcon icon={faFilter} />
              </button>
              <div className={`dropdown-menu`} aria-labelledby="dropdownMenuButton">
                <div className="row p-4">
                  <div className="col-12">
                    <div className="row">
                      {this.props.columns.map((col, index) => (
                        <div className="col-4 form-group" key={index}>
                          <label htmlFor={col.name} className="mb-0 text-secondary">{col.name}</label>
                          <input type="text" className="form-control p-0" name={col.name} ref={col.name} value={filters[col.name] || ""} onChange={this.update} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-12 text-right mt-2">
                    <button className="btn btn-secondary ml-2" onClick={this.reset}>Reset</button>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Filter;