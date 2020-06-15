import React from 'react';
import { shallow } from 'enzyme';
import { limitsConfig } from '../custom-data';
import Pagination from '../Pagination.jsx';

describe.skip('Pagination', () => {

  describe('with default props as total pages 4 and current page 1', () => {
    let wrapper;
    const options = { limit: 5, page: 1, totalPages: 4 };
    const updatePage = jest.fn();
    const updateLimits = jest.fn();
    beforeEach(() => {
      wrapper = shallow(<Pagination config={limitsConfig} options={options} updateLimits={updateLimits} updatePage={updatePage} />);
    });

    it('should render properly', () => {
      expect(wrapper).not.toBeNull;
    })

    it('should render page size dropdown', () => {
      expect(wrapper.find('select').length).toEqual(1);
    });

    it('should show the label for pageSize', () => {
      expect(wrapper.find('label').text()).toEqual("per page");
    });

    it('should set the pageSize on dropdown', () => {
      expect(wrapper.find('select').prop('defaultValue')).toEqual(limitsConfig.default);
    });

    it('should render the page info', () => {
      expect(wrapper.find('span').text()).toEqual('1 of 4');
      expect(wrapper.find('span').html()).toContain('1 of 4');
      expect(wrapper.find('span').html()).toMatch('1 of 4');
    });

    it('should render the prev and next button', () => {
      expect(wrapper.find('#prev').length).toEqual(1);
      expect(wrapper.find('#next').length).toEqual(1);
    });

    it('should disable the prev button and enable the next button if page is 1', () => {
      expect(wrapper.find('#prev').props().disabled).toBeTruthy();
      expect(wrapper.find('#next').props().disabled).toBeFalsy();
    });

    it('should be able to update the page size', () => {
      wrapper.find('select').simulate('change', {
        target: {
          value: '10'
        }
      });
      expect(updateLimits).toHaveBeenCalledTimes(1);
      expect(updateLimits).toHaveBeenCalledWith({ limit: 10 });
    });

    it('should be able to click the prev and next button', () => {
      wrapper.find('#prev').simulate('click');
      expect(updatePage).toHaveBeenCalledTimes(1);
      expect(updatePage).toHaveBeenCalledWith('p');

      wrapper.find('#next').simulate('click');
      expect(updatePage).toHaveBeenCalledTimes(2);
      expect(updatePage).toHaveBeenCalledWith('n');
    });

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();

    });
  });

  describe('with props as total pages 1 and current page 1', () => {
    let wrapper1;
    const updatePage = jest.fn();
    const updateLimits = jest.fn();
    beforeEach(() => {
      wrapper1 = shallow(
        <Pagination
          config={limitsConfig}
          options={{ limit: 5, page: 1, totalPages: 1, fetch: false }}
          updateLimits={updateLimits} updatePage={updatePage}
        />
      );
    })
    it('should render properly', () => {
      expect(wrapper1.find('#prev').props().disabled).toBeTruthy();
      expect(wrapper1.find('#next').props().disabled).toBeTruthy();
    });

    it('should match the snapshot', () => {
      expect(wrapper1).toMatchSnapshot();
    });

  });

});