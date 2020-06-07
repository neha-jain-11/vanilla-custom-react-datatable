const columns = ["Employee ID", "Name", "Gender", "Age", "Title", "Location", "Salary", "Rating", "Progress"];

const sortByOrder = (data, key, order) => {
  data.sort((a, b) => {
    if (order === 'ASC') {
      return a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0;
    } else if (order === 'DSC') {
      return a[key] < b[key] ? 1 : b[key] < a[key] ? -1 : 0;
    }
    return 0;
  });
}

const getFilteredData = (records, filters) => {
  if (Object.entries(filters).length > 0) {
    const arr = [];
    const mapFilter = {};
    for (let i in filters) {
      const index = columns.indexOf(i);
      arr.push(index);
      mapFilter[index] = isNaN(filters[i]) ? filters[i] : Number(filters[i]);
    }
    console.log('filters', filters);
    console.log('mapFilter', mapFilter);

    const filteredData = [];
    records.forEach((data, index) => {
      const temp = [];
      data.forEach((val, index) => {
        if (arr.indexOf(index) > -1) {
          temp.push(val === mapFilter[index]);
        }
      });
      console.log('temp', temp);
      const falsyValue = temp.find(val => {
        if (val === false) {
          return true;
        }
      });
      if (temp.length > 0 && falsyValue === undefined) {
        filteredData.push(data);
      }
    });
    console.log(filteredData);
    return filteredData;
  } else {
    return records;
  }
}

module.exports = {
  sortByOrder,
  getFilteredData
};

