import React from "react";

function Pagination(props) {
  return (
    <div className="col-12 my-2">
      <div className="row">
        <div className="col-md-6 col-12 text-center text-md-right">
          <select name="pageSize" id="pageSize" className="mr-2 form-control-sm"
            defaultValue={props.config.default}
            onChange={(e) => { props.updateLimits({ limit: Number(e.target.value) }) }}>
            {props.config.limits.map((val, index) => (
              <option value={val} key={index}>{val}</option>
            ))}
          </select>
          <label htmlFor="pageSize">per page</label>
        </div>
        <div className="col-md-6 col-12 mt-4 mt-md-0 text-center text-md-left">
          {
            props.options.page === 1 ?
              <button className="mr-4 px-3 btn btn-info" disabled onClick={() => { props.updatePage('p') }}> &lt; </button>
              :
              <button className="mr-4 px-3 btn btn-info" onClick={() => { props.updatePage('p') }}> &lt; </button>
          }
          <span>{props.options.page} of {props.options.totalPages}</span>
          {
            props.options.page === props.options.totalPages ?
              <button className="ml-4 px-3 btn btn-info" disabled onClick={() => { props.updatePage('n') }}> &gt; </button>
              :
              <button className="ml-4 px-3 btn btn-info" onClick={() => { props.updatePage('n') }}> &gt; </button>
          }
        </div>
      </div>
    </div>
  );
}

export default Pagination;
