import React, { useState, useEffect } from "react";
import TableBody from "./TableBody.jsx";
import Pagination from "./Pagination.jsx";
import Filter from "./Filter.jsx";
import { columns } from './custom-data';
import "./style.css";

function CustomDataTable(props) {
  const [fetch, setFetch] = useState(false);
  const [pagination, setPagination] = useState({ limit: props.limitsConfig.default, page: 1, totalPages: Math.ceil(props.data.totalRecords / props.limitsConfig.default) });
  const [sort, setSort] = useState(props.persistData.sort);
  const [filters, setFilters] = useState(props.persistData.filters);
  const [records, setRecords] = useState(props.data.records);
  const [totalRecords, setTotalRecords] = useState(props.data.totalRecords);

  const updatePagination = (data) => {
    const limit = data && data.limit ? data.limit : pagination.limit;
    const records = totalRecords;
    const totalPages = limit <= records ? Math.ceil(records / limit) : 1;
    let page = data && data.page ? data.page : pagination.page;
    page = page <= totalPages ? page : 1;
    setFetch(true);
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
    setFetch(true);
    setFilters(filterData);
  };
  const updateSort = (data) => {
    setFetch(true);
    setSort(data);
  };

  const updateRecords = () => {
    const limit = pagination.limit;
    const records = totalRecords;
    const totalPages = limit <= records ? Math.ceil(records / limit) : 1;
    let page = records > limit ? pagination.page : 1;
    page = page <= totalPages ? page : 1;
    setPagination({ limit, totalPages, page });
  }

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
    console.log('usereeefooec');
    console.log('hey 3');
    if (fetch) {
      fetchRecords();
      setFetch(false);
    }
  }, [pagination, filters, sort]);

  useEffect(() => {
    console.log('jj', props.data);
    setRecords(props.data.records);
    setTotalRecords(props.data.totalRecords);
  }, [props.data]);

  useEffect(() => {
    updateRecords();
  }, [props.data])

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
