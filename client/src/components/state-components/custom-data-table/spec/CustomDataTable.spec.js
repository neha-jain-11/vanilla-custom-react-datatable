import * as React from 'react';
import { shallow, mount } from 'enzyme';
import CustomDataTable from '../CustomDataTable.jsx';
import Pagination from '../Pagination.jsx';
import Filter from '../Filter.jsx';
import TableBody from '../TableBody.jsx';
import { columns } from '../columns';
import { limitsConfig } from '../custom-data';
import * as CustomData from '../custom-data';

describe('CustomDataTable', () => {
  let wrapper;
  let mockServiceData;
  let updateToLocalStorage;
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
    mockServiceData = jest.spyOn(CustomData, 'fetchRecords').mockImplementation(() => ({ records: mockData, totalRecords: 10 }));
    updateToLocalStorage = jest.spyOn(CustomData, 'updateToLocalStorage').mockImplementation(() => (true));
    wrapper = mount(
      <CustomDataTable
        tableTitle="Test Data"
      />);
  });

  // it('should render properly', () => {
  //   expect(wrapper).not.toBeNull;
  // });

  it('should render children', () => {
    // console.log('wrapper', wrapper.find(Pagination).length);
    // console.log('wrapper', wrapper.find(Pagination).props());
    expect(wrapper.find(Pagination)).toBeTruthy();
    expect(wrapper.find(Filter)).toBeTruthy();
    expect(wrapper.find(TableBody)).toBeTruthy();

    expect(mockServiceData).toHaveBeenCalledTimes(1);
    expect(wrapper.find(Pagination).props().options).toEqual({
      limit: 5,
      page: 1,
      totalPages: 0
    });
  });

  it('test1', (done) => {
    wrapper.find(Pagination).props().updateLimits({ limit: 10 });
    setTimeout(() => {
      expect(wrapper.state().pagination.limit).toEqual(10);
      expect(updateToLocalStorage).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('test2', (done) => {
    wrapper.find(Pagination).props().updatePage('n');
    setTimeout(() => {
      expect(wrapper.state().pagination.totalPages).toEqual(2);
      expect(updateToLocalStorage).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('test3', (done) => {
    wrapper.find(Filter).props().updateFilters({ 'Age': 23 });
    setTimeout(() => {
      expect(wrapper.state().filters).toEqual({ 'Age': 23 });
      expect(updateToLocalStorage).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('test4', (done) => {
    wrapper.find(TableBody).props().updateSort({
      target: {
        dataset: {
          index: 3
        }
      }
    });
    setTimeout(() => {
      expect(wrapper.state().sort.index).toEqual(3);
      expect(updateToLocalStorage).toHaveBeenCalledTimes(1);
      done();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

});