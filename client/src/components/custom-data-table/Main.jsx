import React, { Component } from "react";
import CustomDataTable from "./CustomDataTable.jsx";
import { getServiceData } from "../../services/data";
import { limitsConfig, columns } from "./custom-data";
const fetch = require("node-fetch");

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
    const filters = params.filters;
    let filterKey = '';
    for (let i in filters) {
      filterKey += `&filters[${i}]=${filters[i]}`;
    }
    const url = `/api/v1/employees?limit=${params.limit}&page=${params.page}&key=${params.sortKey}&order=${params.order}${filterKey}`;
    const response = await getServiceData(url);
    this.setState({ data: response });
  }

  render() {
    return (
      <div>
        {this.state.data ?
          <CustomDataTable
            fetchRecords={this.fetchRecords}
            columns={columns}
            data={this.state.data}
            tableTitle="Employee Data"
            limitsConfig={limitsConfig}
          /> : 'loader'}
      </div>
    );
  }
}

export default Main;
