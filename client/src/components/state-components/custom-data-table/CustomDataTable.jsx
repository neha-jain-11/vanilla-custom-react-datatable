import React, { Component } from "react";
import TableBody from "./TableBody.jsx";
import Pagination from "./Pagination.jsx";
import Filter from "./Filter.jsx";
import { limitsConfig, getPersistData, fetchRecords, updateToLocalStorage } from "./custom-data";
import { columns } from "./columns";
import "./style.css";

class CustomDataTable extends Component {
  constructor(props) {
    super(props);
    const getData = getPersistData();
    this.state = {
      pagination: {
        limit: 5,
        page: 1,
        totalPages: 0
      },
      sort: getData.sort || {
        index: '',
        order: '' // there is no default sorting
      },
      filters: getData.filters || {},
      records: [],
      totalRecords: 0
    };
    this.updatePagination = this.updatePagination.bind(this);
    this.updatePage = this.updatePage.bind(this);
    this.updateSort = this.updateSort.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
  }

  async componentDidMount() {
    const params = {
      limit: limitsConfig.default,
      page: 1,
      sortKey: this.state.sort.index,
      order: this.state.sort.order,
      filters: this.state.filters
    };
    const data = await fetchRecords(params);
    this.updateRecords(data);
  }

  updateRecords(data) {
    const recordsLength = data.totalRecords;
    const limit = limitsConfig.default;
    const totalPages = limit <= recordsLength ? Math.ceil(recordsLength / limit) : 1;
    console.log('>>>>>', totalPages);
    this.setState({
      'pagination': {
        ...this.state.pagination,
        ...{ limit, totalPages }
      },
      totalRecords: recordsLength,
      records: data.records
    });
  }

  updatePagination(data) {
    console.log('nehahhhhhh');
    const limit = data && data.limit ? data.limit : this.state.pagination.limit;
    const records = this.state.totalRecords;
    const totalPages = limit <= records ? Math.ceil(records / limit) : 1;
    let page = data && data.page ? data.page : this.state.pagination.page;
    page = page <= totalPages ? page : 1;

    this.fetchData({ pagination: { limit, totalPages, page } });
  }

  updatePage(type) {
    const page = this.state.pagination.page;
    if (type === 'p') {
      this.updatePagination({ page: page - 1 });
    } else if (type === 'n') {
      this.updatePagination({ page: page + 1 });
    }
  }

  updateSort(event) {
    const index = event.target['dataset'].index;
    const order = this.state.sort.index === index ? this.toggleOrder(this.state.sort.order) : 'ASC';
    this.fetchData({ sort: { index, order } });
  }

  toggleOrder(order) {
    if (order === 'ASC') return 'DSC';
    if (order === 'DSC') return 'ASC';
  }

  async fetchData(obj) {
    const filters = obj.filters ? obj.filters : this.state.filters;
    const pagination = obj.pagination ? obj.pagination : this.state.pagination;
    const sort = obj.sort ? obj.sort : this.state.sort;
    const params = {
      limit: pagination.limit,
      page: pagination.page,
      sortKey: sort.index,
      order: sort.order,
      filters,
    };
    const data = await fetchRecords(params);
    const totalPages = pagination.limit <= data.totalRecords ? Math.ceil(data.totalRecords / pagination.limit) : 1;
    const updatePagination = { ...pagination, ...{ totalPages } };
    this.setState({ records: data.records, totalRecords: data.totalRecords, pagination: updatePagination, sort, filters }, () => {
      updateToLocalStorage(filters, sort);
    });
  }

  async calltoFetchAsync(params) {
    return await fetchRecords(params);
  }

  updateFilters(filters) {
    this.fetchData({ filters });
  }

  render() {
    return (
      <div className="col-12">
        <div className="row">
          <div className="col-12 mb-md-3">
            <div className="row">
              <div className="col-12">
                <h2>{this.props.tableTitle}</h2>
              </div>
              <Filter
                columns={columns}
                filters={this.state.filters}
                updateFilters={this.updateFilters}
              />
            </div>
          </div>
          <div className="col-12 text-center p-0">
            <TableBody
              tabletitle={"Employee Data"}
              data={this.state.records}
              columns={columns}
              sort={this.state.sort}
              updateSort={this.updateSort}
            />
            <Pagination
              updateLimits={this.updatePagination}
              updatePage={this.updatePage}
              config={limitsConfig}
              options={this.state.pagination}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CustomDataTable;
