import React, { useState, useEffect } from "react";
import TableBody from "./TableBody.jsx";
import Pagination from "./Pagination.jsx";
import Filter from "./Filter.jsx";
import { columns } from './custom-data';
import "./style.css";

function CustomDataTable(props) {

  const getPage = (limit, page) => {
    const records = props.data.totalRecords;
    const totalPages = limit <= records ? Math.ceil(records / limit) : 1;
    page = page <= totalPages ? page : 1;
    return page;
  };

  const getPaginationData = (limit, page) => {
    const records = props.data.totalRecords;
    const totalPages = limit <= records ? Math.ceil(records / limit) : 1;
    return { limit, totalPages, page: getPage(limit, page) };
  };

  const prevPagination = getPaginationData(props.limitsConfig.default, getPage(props.limitsConfig.default, 1));
  const [pagination, setPagination] = useState(prevPagination);
  const [sort, setSort] = useState(props.persistData.sort);
  const [filters, setFilters] = useState(props.persistData.filters);
  const [records, setRecords] = useState(props.data.records);
  const [totalRecords, setTotalRecords] = useState(props.data.totalRecords);

  const updatePagination = (data) => {
    const limit = data && data.limit ? data.limit : pagination.limit;
    const totalPages = limit <= totalRecords ? Math.ceil(totalRecords / limit) : 1;
    let page = data && data.page ? data.page : pagination.page;
    page = page <= totalPages ? page : 1;
    setPagination({ limit, totalPages, page });
  }

  const updatePage = (type) => {
    const page = pagination.page;
    if (type === 'p') {
      updatePagination({ page: page - 1 });
    } else if (type === 'n') {
      updatePagination({ page: page + 1 });
    }
  }

  const updateFilters = (filterData) => {
    setFilters(filterData);
  };
  const updateSort = (data) => {
    setSort(data);
  };

  const fetchRecords = () => {
    const params = {
      limit: pagination.limit,
      page: pagination.page,
      sortKey: sort.index,
      order: sort.order,
      filters,
    };
    props.fetchRecords(params);
    updateToLocalStorage();
  };

  const updateToLocalStorage = () => {
    localStorage.setItem('filters', JSON.stringify(filters));
    localStorage.setItem('sort', JSON.stringify(sort));
  }

  useEffect(() => {
    if (JSON.stringify(prevPagination) !== JSON.stringify(pagination)) {
      console.log('hey');
      fetchRecords();
    }
  }, [pagination]);

  useEffect(() => {
    if (JSON.stringify(props.persistData.sort) !== JSON.stringify(sort)) {
      fetchRecords();
    }
  }, [sort]);

  useEffect(() => {
    if (JSON.stringify(props.persistData.filters) !== JSON.stringify(filters)) {
      fetchRecords();
    }
  }, [filters]);

  useEffect(() => {
    setRecords(props.data.records);
    setTotalRecords(props.data.totalRecords);
    // setPagination(getPaginationData(props.limitsConfig.default, pagination.page));
  }, [props.data]);

  return (
    <div className="col-12">
      <div className="row">
        <div className="col-12 mb-md-3">
          <div className="row">
            <div className="col-12">
              <h2>{props.tableTitle}</h2>
            </div>
            <Filter
              columns={props.columns}
              filters={filters}
              updateFilters={updateFilters}
            />
          </div>
        </div>
        <div className="col-12 text-center p-0">
          <TableBody
            tabletitle={"Employee Data"}
            data={records}
            columns={props.columns}
            sort={sort}
            updateSort={updateSort}
          />
          <Pagination
            updateLimits={updatePagination}
            updatePage={updatePage}
            config={props.limitsConfig}
            options={pagination}
          />
        </div>
      </div>
    </div>
  );
}

export default CustomDataTable;
