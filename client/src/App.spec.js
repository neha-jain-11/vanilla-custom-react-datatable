import React from 'react';
import { mount } from 'enzyme';
import App from './App.jsx';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

describe('App', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  });

  it('1', () => {
    expect(wrapper).toBeTruthy();
    console.log(wrapper.html());

    console.log(wrapper.find('a').length);
    console.log(wrapper.find(Link).length);
    console.log(wrapper.find(Route).length);
    console.log(wrapper.find(Route).html());
    console.log(wrapper.find(Route).props().path);

    console.log(wrapper.find(Link).at(0).html());
    console.log(wrapper.find(Link).at(0).text());

    wrapper.find('a').at(0).simulate('click', { button: 0 });
    console.log(wrapper.html());
    expect(wrapper.html()).toMatch('Home Employee data');

    wrapper.find('a').at(1).simulate('click', { button: 0 });
    console.log(wrapper.html());
    expect(wrapper.html()).toMatch('Test Employee data')
    // console.log(wrapper.find('a').at(1).html());
    // console.log(wrapper.find('a').at(0).html());
    // console.log(wrapper.find('a').first().html());
    // console.log(wrapper.find('a').last().html());
  })

})
