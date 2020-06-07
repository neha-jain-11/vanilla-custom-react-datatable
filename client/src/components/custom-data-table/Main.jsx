import React, { Component } from "react";
import CustomDataTable from "./CustomDataTable.jsx";
import { getServiceData } from "../../services/data";
const fetch = require("node-fetch");

class Main extends Component {
  constructor() {
    super();
    this.state = {
      success: false,
      error: false,
      data: null,
    };
  }

  async componentWillMount() {
    const response = await getServiceData('/api/v1/employees');
    this.setState({ data: response });
  }

  render() {
    return (
      <div>s
        {this.state.data ?
          <CustomDataTable
            columns={["Employee ID", "Name", "Gender", "Age", "Title", "Location", "Salary", "Rating", "Progress"]}
            data={this.state.data}
            tableTitle="Employee Data"
          /> : 'loader'}
      </div>
    );
  }
}

export default Main;
