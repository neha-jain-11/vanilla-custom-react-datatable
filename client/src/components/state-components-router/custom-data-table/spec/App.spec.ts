import React from 'react';
import { mount } from 'enzyme';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

describe('App', () => {

  let wrapper;
  beforeEach(() => {

    wrapper = mount(<App />);
  });

  it('1', () => {
    expect(wrapper).not.ToBe.null;
  })

})
