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

    //     Mouse button
    // Click-related events always have the button property, which allows to get the exact mouse button.

    // We usually don’t use it for click and contextmenu events, because the former happens only on left-click, and the latter – only on right-click.

    // From the other hand, mousedown and mouseup handlers we may need event.button, because these events trigger on any button, so button allows to distinguish between “right-mousedown” and “left-mousedown”.

    // The possible values of event.button are:

    // Button state	event.button
    // Left button (primary)	0
    // Middle button (auxillary)	1
    // Right button (secondary)	2
    // X1 button (back)	3
    // X2 button (forward)	4
  })

})
