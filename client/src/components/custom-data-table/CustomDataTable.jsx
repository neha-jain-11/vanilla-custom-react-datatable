import React, { Component } from "react";
import TableBody from "./TableBody.jsx";
import Pagination from "./Pagination.jsx";
import Filter from "./Filter.jsx";
import "./style.css";

class CustomDataTable extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="m-4">
        <div className="row p-4">
          <div className="col-12 text-center"><h2>{this.props.tableTitle}</h2></div>
          <Filter />
          <TableBody
            tabletitle={"Employee Data"}
            data={this.props.data}
            columns={this.props.columns} />
          <Pagination />
        </div>
      </div>
    );
  }
}

export default CustomDataTable;
