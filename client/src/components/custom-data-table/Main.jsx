import React, { Component } from "react";
import CustomDataTable from "./CustomDataTable.jsx";
import { getServiceData } from "../../services/data";
const fetch = require("node-fetch");

const limitsConfig = { limits: [5, 10, 20, 50], default: 10 };
class Main extends Component {
  constructor() {
    super();
    this.state = {
      success: false,
      error: false,
      data: null,
    };
    this.fetchRecords = this.fetchRecords.bind(this);
  }

  async componentWillMount() {
    this.fetchRecords({ limit: limitsConfig.default, page: 1 });
  }

  async fetchRecords(params) {
    const url = `/api/v1/employees?limit=${params.limit}&page=${params.page}&key=${params.sortKey}&order=${params.order}`;
    const response = await getServiceData(url);
    this.setState({ data: response });
  }

  render() {
    return (
      <div>
        {this.state.data ?
          <CustomDataTable
            fetchRecords={this.fetchRecords}
            columns={["Employee ID", "Name", "Gender", "Age", "Title", "Location", "Salary", "Rating", "Progress"]}
            data={this.state.data}
            tableTitle="Employee Data"
            limitsConfig={limitsConfig}
          /> : 'loader'}
      </div>
    );
  }
}

export default Main;
