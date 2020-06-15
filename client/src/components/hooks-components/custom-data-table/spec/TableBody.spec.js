import * as React from 'react';
import { shallow } from 'enzyme';
import TableBody from '../TableBody.jsx';
import { columns } from '../columns';

describe.skip('TableBody', () => {
  let wrapper;
  const updateSort = jest.fn();
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
      <TableBody
        sort={{ order: '', index: '' }} columns={columns} updateSort={updateSort}
        data={data}
        tableTitle={"Test Data"}
      />);
  });

  it('should render properly', () => {
    expect(wrapper).not.toBeNull;
  });

  it('should update on click of sort', () => {
    wrapper.find('#th-Age').simulate('click', {
      target: {
        dataset: {
          index: 3
        }
      }
    });
    expect(updateSort).toHaveBeenCalledTimes(1);
    expect(updateSort).toHaveBeenCalledWith({
      index: 3,
      order: 'ASC'
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

});