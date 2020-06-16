import * as React from 'react';
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
import { shallow, mount } from 'enzyme';
import ConnectedTableBody, { TableBody } from '../TableBody.jsx';
import { columns } from '../columns';
// import { employeeReducer } from '../../../../reducers/employee';
import configureStore from 'redux-mock-store';
import { getRecords, ACTION_TYPES } from '../../../../actions/employee';
import renderer from 'react-test-renderer';
import ConnectedCustomDataTable, { CustomDataTable } from '../CustomDataTable.jsx';
import Pagination from '../Pagination.jsx';
import * as CustomData from '../custom-data';

describe.skip('hey test', () => {
  let store, wrapper, wrapper1;
  let mockServiceData;
  const updateSort = jest.fn();
  const mockData = [
    [
      1,
      "Akshay",
      "M",
      23,
      "DEV",
      "INDIA",
      10000,
      2,
      20
    ],
    [
      2,
      "Cathy",
      "F",
      23,
      "DEV",
      "INDIA",
      12000,
      5,
      90
    ]
  ];

  // const r = (state) => {
  //   return {
  //     data: {
  //       records: [['neha'], ['jain']],
  //       totalRecords: 20
  //     }
  //   };
  // }
  const mockStore = configureStore()
  const fetchRecordsFromServer = jest.fn(() => { console.log('yop yo') });
  beforeEach(() => {
    mockServiceData = jest.spyOn(CustomData, 'fetchRecords').mockImplementation(() => ({ records: mockData, totalRecords: 10 }));
    store = mockStore({
      data: {
        records: [['neha'], ['jain']],
        totalRecords: 20
      }
    });

    // wrapper = mount(
    //   <Provider store={store}>
    //     <ConnectedTableBody
    //       sort={{ order: '', index: '' }}
    //       columns={columns}
    //       updateSort={updateSort}
    //       tableTitle={"Test Data"}
    //     /></Provider>);

    wrapper1 = mount(
      <Provider store={store}>
        <ConnectedCustomDataTable
          tableTitle={"Test Data"}
        /></Provider>);
  });

  // it('+++ render the connected(SMART) component', () => {
  //   expect(wrapper).not.toBeNull;
  //   expect(wrapper.find(ConnectedTableBody).length).toEqual(1)
  // });

  // it('+++ render the connected(SMART) component -connected custom datatable', () => {
  //   expect(wrapper1).not.toBeNull;
  //   expect(wrapper1.find(ConnectedCustomDataTable).length).toEqual(1)
  // });

  // it('+++ check dispatch event - not working', (done) => {
  //   wrapper1.find(CustomDataTable).setProps({ 'fetchRecordsFromServer': fetchRecordsFromServer });
  //   wrapper1.find(Pagination).props().updateLimits({ limit: 10 });
  //   setTimeout(() => {
  //     expect(fetchRecordsFromServer).toHaveBeenCalledTimes(1);
  //     done();
  //   });
  // });

  // it('+++ check Prop matches with initialState', () => {
  //   expect(wrapper.find(TableBody).prop('data')).toEqual([["neha"], ["jain"]]);
  //   expect(wrapper.find('tr').length).toEqual(3);
  // });

  // it('+++ check action on dispatching ', () => {
  //   let action;
  //   store.dispatch(getRecords({ type: ACTION_TYPES.GET_RECORDS, data: {} }));
  //   action = store.getActions()
  //   expect(action[0].type).toBe(ACTION_TYPES.GET_RECORDS);
  // });

  // it('+++capturing Snapshot of TableBody', () => {
  //   const t = <TableBody
  //     sort={{ order: '', index: '' }}
  //     columns={columns}
  //     updateSort={updateSort}
  //     tableTitle={"Test Data"}
  //     data={[["neha"], ["jain"]]}
  //   />;
  //   const renderedValue = renderer.create(t).toJSON();
  //   expect(renderedValue).toMatchSnapshot();
  // });
});