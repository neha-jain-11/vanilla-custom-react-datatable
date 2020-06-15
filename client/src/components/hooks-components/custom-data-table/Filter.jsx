import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faFilter } from '@fortawesome/free-solid-svg-icons';

function Filter(props) {
  const [filters, update] = useState(props.filters);
  const reset = () => (update({}));

  const logicalUpdate = (event) => {
    let val = event.target.value;
    if (val) {
      val = isNaN(Number(val)) ? val : Number(val);
      return { ...filters, ...{ [event.target.name]: val } };
    } else {
      delete filters[event.target.name];
      return Object.keys(filters).length === 0 ? {} : filters;
    }
  };

  const removeFilters = (event) => {
    delete filters[event.currentTarget.id];
    return Object.keys(filters).length === 0 ? {} : filters;
  };

  useEffect(() => {
    console.log('heheh >>>>>heheheh123');
    console.log('props.filters', props.filters);
    console.log('filters', filters);
    if (props.filters !== filters) {
      console.log('heheh >>>>>heheheh456');
      props.updateFilters(filters);
    }
  }, [filters]);

  return (
    <div className="col-12 mb-3">
      <div className="row">
        <div className="col-md-8 col-12 order-2 order-md-1 mb-3 mb-md-0">
          {
            filters && Object.keys(filters).map((val, index) => (
              <span key={index} className="badge badge-pill badge-secondary pb-2">
                <span className="badgeValue">{filters[val]}</span>
                <FontAwesomeIcon id={val} icon={faTimesCircle} className="ml-1 close-button text-danger" onClick={(e) => update(removeFilters(e))} />
              </span>
            ))
          }
        </div>
        <div className="col-md-4 col-12 order-1 order-md-2 mb-3 mb-md-0 text-right">
          <div className="dropdown" >
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <FontAwesomeIcon icon={faFilter} />
            </button>
            <div className={`dropdown-menu`} aria-labelledby="dropdownMenuButton">
              <div className="row p-4">
                <div className="col-12">
                  <div className="row">
                    {props.columns.map((col, index) => (
                      <div className="col-4 form-group" key={index}>
                        <label htmlFor={col.name} className="mb-0 text-secondary">{col.name}</label>
                        <input type="text" className="form-control p-0" name={col.name} value={filters[col.name] || ""} onChange={(e) => update(logicalUpdate(e))} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-12 text-right mt-2">
                  <button id='reset' className="btn btn-secondary ml-2" onClick={reset}>Reset</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Filter;