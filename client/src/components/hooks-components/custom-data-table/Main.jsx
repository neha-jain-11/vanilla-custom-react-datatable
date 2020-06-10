import React, { useState, useEffect } from "react";
import CustomDataTable from "./CustomDataTable.jsx";
import { getServiceData } from "../../../services/data";
import { limitsConfig } from "./custom-data";
import { columns } from "./columns";
const fetch = require("node-fetch");

function Main() {
  const [data, setData] = useState(null);

  const getPersistData = () => {
    return {
      filters: JSON.parse(localStorage.getItem('filters')) || {},
      sort: JSON.parse(localStorage.getItem('sort')) || { index: '', order: '' }
    };
  };

  const fetchRecords = async (params) => {
    const filters = params.filters;
    let filterKey = '';
    for (let i in filters) {
      filterKey += `&filters[${i}]=${filters[i]}`;
    }
    const url = `/api/v1/employees?limit=${params.limit}&page=${params.page}&key=${params.sortKey}&order=${params.order}${filterKey}`;
    const response = await getServiceData(url);
    setData(response);
  };

  useEffect(() => {
    const getData = getPersistData();
    console.log('hey, i am in main.js');
    fetchRecords({
      limit: limitsConfig.default,
      page: 1,
      sortKey: getData.sort.index,
      order: getData.sort.order,
      filters: getData.filters
    });
  }, [])

  return (
    <div className="row p-4">
      {data ?
        <CustomDataTable
          fetchRecords={fetchRecords}
          columns={columns}
          data={data}
          tableTitle="Employee Data"
          limitsConfig={limitsConfig}
          persistData={getPersistData()}
        /> : <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>}
    </div>
  );
}

export default Main;
