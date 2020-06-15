import * as React from 'react';
import { shallow } from 'enzyme';
import CustomDataTable from '../CustomDataTable.jsx';
import Pagination from '../Pagination.jsx';
import Filter from '../Filter.jsx';
import TableBody from '../TableBody.jsx';
import { columns } from '../columns';
import { limitsConfig } from '../custom-data';

describe.skip('CustomDataTable', () => {
  let wrapper;
  const fetchRecords = jest.fn();
  let setState;
  const data = [
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

  beforeEach(() => {
    setState = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation((init) => [init, setState]);
    jest.spyOn(React, 'useEffect').mockImplementation((cb) => cb());
    wrapper = shallow(
      <CustomDataTable
        fetchRecords={fetchRecords}
        columns={columns}
        data={{ records: data, recordsLength: 2 }}
        tableTitle="Test Data"
        limitsConfig={limitsConfig}
        persistData={{ filters: {}, sort: { index: '', order: '' } }}
      />);
  });

  it('should render properly', () => {
    expect(wrapper).not.toBeNull;
  });

  it('should render children', () => {
    expect(wrapper.find(<Pagination />)).toBeTruthy();
    expect(wrapper.find(<Filter />)).toBeTruthy();
    expect(wrapper.find(<TableBody />)).toBeTruthy();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

});