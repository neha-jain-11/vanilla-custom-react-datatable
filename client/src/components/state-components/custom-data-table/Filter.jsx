import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faFilter } from '@fortawesome/free-solid-svg-icons';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.reset = this.reset.bind(this);
    this.removeFilters = this.removeFilters.bind(this);
  }

  update(event) {
    let val = event.target.value;
    let fil;
    if (val) {
      val = isNaN(Number(val)) ? val : Number(val);
      fil = { ...this.props.filters, ...{ [event.target.name]: val } };
    } else {
      fil = { ...this.props.filters };
      delete fil[event.target.name];
    }
    this.updateFilters(fil);
  }

  reset() {
    const dataRefs = this.refs;
    console.log('dataRefs', dataRefs);
    this.props.columns.map((col, index) => {
      if (dataRefs[col.name]) {
        dataRefs[col.name].value = "";
      }
    });
    this.updateFilters({});
  }

  updateFilters(filters) {
    this.props.updateFilters(filters);
  }

  removeFilters(event) {
    const col = event.target.getAttribute('data-col');
    const fil = { ...this.props.filters };
    delete fil[col];
    if (this.refs[col]) {
      this.refs[col].value = "";
    }
    this.updateFilters(fil);
  }

  render() {
    const filters = this.props.filters;
    return (
      <div className="col-12 mb-3">
        <div className="row">
          <div className="col-md-8 col-12 order-2 order-md-1 mb-3 mb-md-0">
            {
              filters && Object.keys(filters).map((val, index) => (
                <span key={index} className="badge badge-pill badge-secondary pb-2" >
                  <span className="badgeValue">{filters[val]}</span>
                  <FontAwesomeIcon id={`${val}`} data-col={val} icon={faTimesCircle} className="ml-1 close-button text-danger" onClick={this.removeFilters} />
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
                    <button id="reset" className="btn btn-secondary ml-2" onClick={this.reset}>Reset</button>
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