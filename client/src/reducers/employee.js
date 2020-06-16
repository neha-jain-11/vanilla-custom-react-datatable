import { ACTION_TYPES } from '../actions/employee';

const initialState = {
  data: {
    records: [],
    totalRecords: 0
  }
};
export const employeeReducer = (state = initialState, action) => {
  let nextState;
  const type = action.type
  switch (type) {
    case ACTION_TYPES.GET_RECORDS:
      const nextData = { ...state.data, ...{ records: action.data.records, totalRecords: action.data.totalRecords } };
      nextState = { ...state, ...{ data: nextData } };
      break;
    default:
      nextState = state;
  }
  console.log('nextSTate', nextState);
  return nextState;
}