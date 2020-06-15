import { getServiceData } from "../../../services/data";

export const limitsConfig = { limits: [5, 10, 20, 50], default: 5 };

export const getPersistData = () => {
  return {
    filters: JSON.parse(localStorage.getItem('filters')) || {},
    sort: JSON.parse(localStorage.getItem('sort')) || { index: '', order: '' }
  }
};;

export const updateToLocalStorage = (filters, sort) => {
  localStorage.setItem('filters', JSON.stringify(filters));
  localStorage.setItem('sort', JSON.stringify(sort));
};

export const fetchRecords = async (params) => {
  const filters = params.filters;
  let filterKey = '';
  for (let i in filters) {
    if (filters[i]) {
      filterKey += `&filters[${i}]=${filters[i]}`;
    }
  }
  const url = `/api/v1/employees?limit=${params.limit}&page=${params.page}&key=${params.sortKey}&order=${params.order}${filterKey}`;
  const response = await getServiceData(url);
  return response;
};



