import React, { Component } from "react";
import TableBody from "./TableBody.jsx";
import Pagination from "./Pagination.jsx";
import Filter from "./Filter.jsx";
import { columns } from './custom-data';
import "./style.css";

class CustomDataTable extends Component {
  constructor() {
    super();
    this.state = {
      pagination: {
        limit: 5,
        page: 1,
        totalPages: 0
      },
      sort: {
        index: '',
        order: '' // there is no default sorting
      },
      filters: {},
      records: [],
      totalRecords: 0
    };
    this.updatePagination = this.updatePagination.bind(this);
    this.updatePage = this.updatePage.bind(this);
    this.updateSort = this.updateSort.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
  }

  componentWillMount() {
    this.setInitialState();
  }

  componentWillReceiveProps({ data }) {
    this.setState({
      records: data.records,
      totalRecords: data.totalRecords
    }, this.updateRecords);
  }

  setInitialState() {
    const length = this.props.data.totalRecords;
    const defaultLimit = this.props.limitsConfig.default;
    this.setState({
      'pagination': {
        ...this.state.pagination,
        ...{ limit: defaultLimit, totalPages: (length / defaultLimit) }
      },
      totalRecords: length,
      records: this.props.data.records
    });
  }

  updatePagination(data) {
    const limit = data && data.limit ? data.limit : this.state.pagination.limit;
    const records = this.state.totalRecords;
    const page = data && data.page ? data.page : this.state.pagination.page;
    const totalPages = limit <= records ? Math.ceil(records / limit) : 1;
    this.setState({
      pagination: { limit, totalPages, page }
    }, () => {
      this.fetchRecords();
    });
  }

  updateRecords() {
    const limit = this.state.pagination.limit;
    const records = this.state.totalRecords;
    const page = records > limit ? this.state.pagination.page : 1;
    const totalPages = limit <= records ? Math.ceil(records / limit) : 1;
    this.setState({
      pagination: { limit, totalPages, page }
    });
  }

  updatePage(type) {
    const page = this.state.pagination.page;
    if (type === 'p') {
      this.updatePagination({ page: page - 1 });
    } else if (type === 'n') {
      this.updatePagination({ page: page + 1 });
    }
    this.fetchRecords();
  }

  updateSort(data) {
    console.log('updated sort', data);
    this.setState({ sort: data }, this.fetchRecords);
  }

  fetchRecords() {
    const filters = this.state.filters;
    const params = {
      limit: this.state.pagination.limit,
      page: this.state.pagination.page,
      sortKey: this.state.sort.index,
      order: this.state.sort.order,
      filters,
    };
    this.props.fetchRecords(params);
  }

  updateFilters(filters) {
    this.setState({ filters }, this.fetchRecords);
  }

  render() {
    return (
      <div className="m-4">
        <div className="row p-4">
          <div className="col-12 text-center"><h2>{this.props.tableTitle}</h2></div>
          <Filter
            columns={this.props.columns}
            updateFilters={this.updateFilters}
          />
          <TableBody
            tabletitle={"Employee Data"}
            data={this.state.records}
            columns={this.props.columns}
            sort={this.state.sort}
            updateSort={this.updateSort}
          />
          <Pagination
            updateLimits={this.updatePagination}
            updatePage={this.updatePage}
            config={this.props.limitsConfig}
            options={this.state.pagination}
          />
        </div>
      </div>
    );
  }
}

export default CustomDataTable;
