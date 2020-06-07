export const sortByOrder = (data, index, order) => {
  data.sort((a, b) => {
    if (order === 'ASC') {
      return a[index] > b[index] ? 1 : b[index] > a[index] ? -1 : 0;
    } else if (order === 'DSC') {
      return a[index] < b[index] ? 1 : b[index] < a[index] ? -1 : 0;
    }
    return 0;
  });

  return data;
};