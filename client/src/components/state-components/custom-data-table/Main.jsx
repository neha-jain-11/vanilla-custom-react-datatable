import React, { Component } from "react";
import CustomDataTable from "./CustomDataTable.jsx";
import { getServiceData } from "../../../services/data";
import { limitsConfig } from "./custom-data";
import { columns } from "./columns";
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
    const getPersistData = this.getPersistData();
    this.fetchRecords({
      limit: limitsConfig.default,
      page: 1,
      sortKey: getPersistData.sort.index,
      order: getPersistData.sort.order,
      filters: getPersistData.filters
    });
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

  getPersistData() {
    return {
      filters: JSON.parse(localStorage.getItem('filters')) || {},
      sort: JSON.parse(localStorage.getItem('sort')) || { index: '', order: '' }
    }
  }

  render() {
    return (
      <div className="row p-4">
        {this.state.data ?
          <CustomDataTable
            fetchRecords={this.fetchRecords}
            columns={columns}
            data={this.state.data}
            tableTitle="Employee Data"
            limitsConfig={limitsConfig}
            persistData={this.getPersistData()}
          /> : <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>}
      </div>
    );
  }
}

export default Main;
