import React, { Component } from "react";
import TableBody from "./TableBody.jsx";
import Pagination from "./Pagination.jsx";
import Filter from "./Filter.jsx";
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
      totalRecords: 0
    };
    this.updatePagination = this.updatePagination.bind(this);
    this.updatePage = this.updatePage.bind(this);
    this.updateSort = this.updateSort.bind(this);
  }

  componentWillMount() {
    this.setInitialState();
  }

  setInitialState() {
    const length = this.props.data.totalRecords;
    const defaultLimit = this.props.limitsConfig.default;
    this.setState({
      'pagination': {
        ...this.state.pagination,
        ...{ limit: defaultLimit, totalPages: (length / defaultLimit) }
      },
      totalRecords: length
    });
  }

  updatePagination(data) {
    const limit = data.limit || this.state.pagination.limit;
    const page = data.page || this.state.pagination.page;
    const records = this.state.totalRecords;
    const totalPages = limit <= records ? records / limit : 1;
    this.setState({
      pagination: { limit, totalPages, page }
    }, () => {
      this.fetchRecords();
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
    this.setState({ sort: data });
  }

  fetchRecords() {
    const params = {
      limit: this.state.pagination.limit,
      page: this.state.pagination.page,
      sortKey: this.state.sort.index,
      order: this.state.sort.order
    };
    this.props.fetchRecords(params);
  }

  render() {
    return (
      <div className="m-4">
        <div className="row p-4">
          <div className="col-12 text-center"><h2>{this.props.tableTitle}</h2></div>
          <Filter />
          <TableBody
            tabletitle={"Employee Data"}
            data={this.props.data.records}
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
