const express = require("express");
const router = express.Router();
const data = require("../data/employee.json");
const { sortByOrder } = require("../utils/util");

router.get('/api/v1/employees', (req, res) => {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  const sortKey = req.query.key;
  const sortOrder = req.query.order || 'ASC'; // ASC || DSC
  const employeeData = [...data];
  // assumption - valid query parameters will be provided , so validation is ignored at this point
  if (page && limit) {
    if (sortKey) {
      sortByOrder(employeeData, sortKey, sortOrder);
    }
    const lastIndex = page * limit;
    const firstIndex = (lastIndex - limit);
    // res.send(employeeData.slice(firstIndex, lastIndex));
    res.send(res.send({ records: employeeData.slice(firstIndex, lastIndex), totalRecords: data.length }));
  }
  res.send({ records: employeeData, totalRecords: data.length });
});



module.exports = {
  employeeRouter: router
};
