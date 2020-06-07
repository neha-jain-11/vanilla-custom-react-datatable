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

module.exports.sortByOrder = sortByOrder;