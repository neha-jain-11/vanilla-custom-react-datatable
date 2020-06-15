import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Filter from '../Filter.jsx';
import { columns } from '../columns';

describe.skip('Filter', () => {
  let wrapper;
  const updateFilters = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<Filter filters={{ 'Age': 23 }} columns={columns} updateFilters={updateFilters} />);
  });

  it('should render properly', () => {
    expect(wrapper).not.toBeNull;
  });

  it('should render badge for age', () => {
    expect(wrapper.find('span .badgeValue').length).toEqual(1);
  });

  it('should render filter dropdown', () => {
    expect(wrapper.find('.dropdown').length).toEqual(1);
  });

  it('should render inputs for all columns', () => {
    expect(wrapper.find('input').length).toEqual(columns.length);
  });

  it('should display the reset button', () => {
    expect(wrapper.find('#reset').length).toEqual(1);
    expect(wrapper.find('#reset').text()).toEqual('Reset');
  });

  it('should be able to set the new age', () => {
    const ageElem = wrapper.find('input[name="Age"]');
    expect(ageElem.length).toEqual(1);
    expect(ageElem.props().value).toEqual(23);
    ageElem.simulate('change', {
      target: {
        value: '25',
        name: 'Age'
      }
    });
    expect(updateFilters).toHaveBeenCalledTimes(1);
    expect(updateFilters).toHaveBeenCalledWith({ 'Age': 25 });
  });

  it('should be able to reset the age input after update', () => {
    const ageElem = wrapper.find('input[name="Age"]');
    expect(ageElem.length).toEqual(1);
    expect(ageElem.props().value).toEqual(23);
    ageElem.simulate('change', {
      target: {
        value: '',
        name: 'Age'
      }
    });
    expect(updateFilters).toHaveBeenCalledTimes(1);
    expect(updateFilters).toHaveBeenCalledWith({});
  });

  it('should be able to reset the filters', () => {
    const ageElem = wrapper.find('input[name="Age"]');
    ageElem.simulate('change', {
      target: {
        value: '255',
        name: 'Age'
      }
    });
    const reset = wrapper.find('#reset');
    reset.simulate('click');
    expect(updateFilters).toHaveBeenCalledTimes(2);
    expect(updateFilters).toHaveBeenLastCalledWith({});
  });

  it('should be able to remove the filter badge', () => {
    const ageCloseIcon = wrapper.find('#Age');
    ageCloseIcon.simulate('click', {
      target: {
        getAttribute: () => {
          return 'Age';
        }
      }
    });
    expect(updateFilters).toHaveBeenCalledTimes(1);
    expect(updateFilters).toHaveBeenCalledWith({});
  });

  it('should be able to call the updateFilters when filters are updated', () => {
    const ageCloseIcon = wrapper.find('#Age');
    ageCloseIcon.simulate('click', {
      target: {
        getAttribute: () => {
          return 'Age';
        }
      }
    });
    expect(updateFilters).toHaveBeenCalledTimes(1);
    expect(updateFilters).toHaveBeenCalledWith({});
  });

  it('should be able to set props properly', () => {
    const wrapper1 = mount(<Filter filters={{ 'Age': 253 }} columns={columns} updateFilters={updateFilters} />);
    const columnsProp = wrapper1.prop('columns');
    const filtersProp = wrapper1.prop('filters');
    expect(columnsProp).toEqual(columns);
    expect(filtersProp['Age']).toEqual(253);

    wrapper1.setProps({ filters: { 'Age': 2 } }); // yes we can set the props again, it willc all the render again by default on setting, on dom elements we can see the altest value , but if we try to get prop , it will be old one
    expect(wrapper1.find('input[name="Age"]').props().value).toEqual(2);

    wrapper1.setState({ test: 'neha' }); // calls the render method again

    console.log('heheh');
    wrapper1.update(); // does not calls the render method again
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

});