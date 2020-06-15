import * as React from 'react';
import { shallow } from 'enzyme';
import Filter from '../Filter.jsx';
import { columns } from '../columns';

describe('Filter', () => {
  let wrapper;
  const updateFilters = jest.fn();
  let setState;

  beforeEach(() => {
    setState = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation((init) => [init, setState]);
    // jest.spyOn(React, 'useEffect').mockImplementation((cb) => cb());
    wrapper = shallow(<Filter filters={{ 'Age': 23 }} columns={columns} updateFilters={updateFilters} />);
  });

  // it('should render properly', () => {
  //   expect(wrapper).not.toBeNull;
  // });

  // it('should render badge for age', () => {
  //   expect(wrapper.find('span .badgeValue').length).toEqual(1);
  // });

  // it('should render filter dropdown', () => {
  //   expect(wrapper.find('.dropdown').length).toEqual(1);
  // });

  // it('should render inputs for all columns', () => {
  //   expect(wrapper.find('input').length).toEqual(columns.length);
  // });

  // it('should display the reset button', () => {
  //   expect(wrapper.find('#reset').length).toEqual(1);
  //   expect(wrapper.find('#reset').text()).toEqual('Reset');
  // });

  // it('should be able to set the new age', () => {
  //   const ageElem = wrapper.find('input[name="Age"]');
  //   expect(ageElem.length).toEqual(1);
  //   expect(ageElem.prop('value')).toEqual(23);
  //   ageElem.simulate('change', {
  //     target: {
  //       value: '25',
  //       name: 'Age'
  //     }
  //   });
  //   expect(setState).toHaveBeenCalledTimes(1);
  //   expect(setState).toHaveBeenCalledWith({ 'Age': 25 });
  // });

  // it('should be able to reset the age input', () => {
  //   const ageElem = wrapper.find('input[name="Age"]');
  //   expect(ageElem.length).toEqual(1);
  //   expect(ageElem.prop('value')).toEqual(23);
  //   ageElem.simulate('change', {
  //     target: {
  //       value: '',
  //       name: 'Age'
  //     }
  //   });
  //   expect(setState).toHaveBeenCalledTimes(1);
  //   expect(setState).toHaveBeenCalledWith({});
  // });

  // it('should be able to reset the filters', () => {
  //   const reset = wrapper.find('#reset');
  //   reset.simulate('click');
  //   expect(setState).toHaveBeenCalledTimes(1);
  //   expect(setState).toHaveBeenCalledWith({});
  // });

  // it('should be able to remove the filter badge', () => {
  //   const ageCloseIcon = wrapper.find('#Age');
  //   ageCloseIcon.simulate('click', {
  //     currentTarget: {
  //       id: 'Age'
  //     }
  //   });
  //   expect(setState).toHaveBeenCalledTimes(1);
  //   expect(setState).toHaveBeenCalledWith({});
  // });

  it('should be able to call the updateFilters when filters are updated', () => {
    const ageCloseIcon = wrapper.find('#Age');
    ageCloseIcon.simulate('click', {
      currentTarget: {
        id: 'Age'
      }
    });
    expect(updateFilters).toHaveBeenCalledTimes(1);
    // expect(updateFilters).toHaveBeenCalledWith({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

});