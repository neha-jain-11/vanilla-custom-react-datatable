export const ACTION_TYPES = {
  'GET_RECORDS': 'GET_RECORDS'
};


export const getRecords = (data) => {
  return {
    type: ACTION_TYPES.GET_RECORDS,
    data: {
      records: data.records,
      totalRecords: data.totalRecords
    }
  };
}