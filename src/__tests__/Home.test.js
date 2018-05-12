import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import Home from '../pages/Home'

describe('Should render Home page/component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Home />);
  });

  it('snapshot should work', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('edit state data', () => {
    wrapper.setState({
      isLoaded: true,
      activeUserName: 'Megatron'
    });
    expect(toJson(wrapper)).toMatchSnapshot()
  })


})
