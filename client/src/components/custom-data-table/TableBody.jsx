import React, { Component } from "react";
const fetch = require("node-fetch");

class TableBody extends Component {
  constructor() {
    super();
    this.state = {
      customData: null,
      pagination: { limit: 5, page: 1, totalRecords: 0 },
      sorting: { name: "", order: "" },
      filters: {}
    };
  }

  render() {
    console.log(this.props.columns);
    return (
      <div className="col-12 text-center p-0">
        <div className="col-8 col-offset-4">
          <table className="table table-bordered">
            <thead>
              <tr>
                {this.props.columns.map((val, index) => (
                  <th scope="col" key={index}>{val}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {this.props.data && this.props.data.map((listValue, index) => {
                const rowClass = `${getClass(index)}`;
                return (
                  <tr key={index} className={rowClass}>
                    <td>{listValue.employeeId}</td>
                    <td>{listValue.name}</td>
                    <td>{listValue.gender}</td>
                    <td>{listValue.age}</td>
                    <td>{listValue.title}</td>
                    <td>{listValue.location}</td>
                    <td>{listValue.salary}</td>
                    <td>{listValue.rating}</td>
                    <td>{listValue.progress}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const getClass = (index) => {
  return index % 2 === 0 ? 'table-danger' : "table-info";
};


export default TableBody;
