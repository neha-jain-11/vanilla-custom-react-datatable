import * as React from 'react';
import { shallow } from 'enzyme';
import CustomDataTable from '../CustomDataTable.jsx';
import Main from '../Main.jsx';
import * as service from "../../../../services/data";

describe.skip('Main', () => {
  let wrapper;
  let setState;
  let mockServiceData;
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

  beforeEach(() => {
    setState = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation((init) => [init, setState]);
    jest.spyOn(React, 'useEffect').mockImplementation((cb) => cb());
    // jest.spyOn(service, 'getServiceData').mockImplementationOnce(() => ({ records: mockData, recordsLength: 2 }));
    mockServiceData = jest.spyOn(service, 'getServiceData').mockImplementationOnce(() => ({ records: mockData, totalRecords: 2 }));
    wrapper = shallow(
      <Main />);
  });

  // it('should render properly', () => {
  //   expect(wrapper).not.toBeNull;
  //   expect(mockServiceData).toHaveBeenCalledTimes(1);
  //   expect(mockServiceData).toHaveBeenCalledWith(`/api/v1/employees?limit=5&page=1&key=&order=`);
  // });

  it('should render children', () => {
    expect(wrapper.find(<CustomDataTable />)).toBeTruthy();
    expect(setState).toHaveBeenCalledTimes(1);

    wrapper.find('button').simulate('click');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

});