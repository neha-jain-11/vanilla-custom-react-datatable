const express = require("express");
const router = express.Router();
const data = require("../data/employee.json");
const { sortByOrder, getFilteredData } = require("../utils/util");
const qs = require('qs');

router.get('/api/v1/employees', (req, res) => {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  const sortKey = req.query.key;
  const sortOrder = req.query.order || 'ASC'; // ASC || DSC
  const filters = req.query.filters || {};
  const parseFilters = qs.parse(filters);
  console.log(parseFilters);

  const employeeData = [...data];
  // assumption - valid query parameters will be provided , so validation is ignored at this point

  const filteredData = getFilteredData(employeeData, filters);
  if (sortKey) {
    sortByOrder(filteredData, sortKey, sortOrder);
  }
  if (page && limit) {
    let lastIndex = page * limit;
    let firstIndex = (lastIndex - limit);
    console.log('filteredData.length', filteredData.length);
    if (filteredData.length < firstIndex) {
      lastIndex = limit;
      firstIndex = 0;
    }
    const selectedData = filteredData.slice(firstIndex, lastIndex);
    res.send(res.send({ records: selectedData, totalRecords: filteredData.length }));
  } else {
    res.send({ records: filteredData, totalRecords: filteredData.length });
  }
});



module.exports = {
  employeeRouter: router
};
