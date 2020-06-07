import React, { Component } from "react";
import "./style.css";
const fetch = require("node-fetch");

class CustomDataTable extends Component {
  constructor() {
    super();
    this.state = {
      success: false,
      error: false,
      data: null,
    };
  }

  async componentWillMount() {
    const response = await fetch(`/api/v1/employees`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(extractedRes => {
        this.setState({ data: extractedRes, success: true });
        return extractedRes;
      })
      .catch(err => {
        this.setState({ 'error': true });
      });
    console.log('response from get details>>', response);
  }

  render() {
    return (
      <div className="m-4">
        <div className="row p-4">
          <div className="col-12 text-center">
            <h2>Employee Data</h2>
          </div>
          <div className="col-12 mb-3">

            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Manage Filter
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div className="row p-4">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-4 form-group">
                        <label htmlFor="Name" className="mb-0 text-secondary">Name</label>
                        <input type="text" className="form-control p-0" name="Name" />
                      </div>
                      <div className="col-4 form-group">
                        <label htmlFor="Gender" className="mb-0 text-secondary">Gender</label>
                        <input type="text" className="form-control p-0" name="Gender" />
                      </div>
                      <div className="col-4 form-group">
                        <label htmlFor="Age" className="mb-0 text-secondary">Age</label>
                        <input type="text" className="form-control p-0" name="Age" />
                      </div>
                      <div className="col-4 form-group">
                        <label htmlFor="Title" className="mb-0 text-secondary">Title</label>
                        <input type="text" className="form-control p-0" name="Title" />
                      </div>

                      <div className="col-4 form-group">
                        <label htmlFor="Location" className="mb-0 text-secondary">Location</label>
                        <input type="text" className="form-control p-0" name="Location" />
                      </div>
                      <div className="col-4 form-group">
                        <label htmlFor="Salary" className="mb-0 text-secondary">Salary</label>
                        <input type="text" className="form-control p-0" name="Salary" />
                      </div>
                      <div className="col-4 form-group">
                        <label htmlFor="Rating" className="mb-0 text-secondary">Rating</label>
                        <input type="text" className="form-control p-0" name="Rating" />
                      </div>
                      <div className="col-4 form-group">
                        <label htmlFor="Progress" className="mb-0 text-secondary">Progress</label>
                        <input type="text" className="form-control p-0" name="Progress" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 text-right mt-2">
                    <button className="btn btn-primary">Submit</button>
                    <button className="btn btn-secondary ml-2">Reset</button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="col-12 mb-3">
            <span className="badge badge-pill badge-secondary pb-2">This is test for neha.<span className="ml-1 close-button">&times;</span></span>
          </div>
          <div className="col-12 text-center p-0">
            <div className="col-8 col-offset-4">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Employee Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Age</th>
                    <th scope="col">Title</th>
                    <th scope="col">Location</th>
                    <th scope="col">Salary</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data && this.state.data.map((listValue, index) => {
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
          </div>
        </div>
      </div>
    );
  }
}

const getClass = (index) => {
  return index % 2 === 0 ? 'table-danger' : "table-info";
};


export default CustomDataTable;
