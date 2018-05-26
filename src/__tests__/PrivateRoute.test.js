import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import PrivateRoute from '../components/PrivateRoute'


describe('PrivateRoute component', () => {
  it('Render snapshot', () => {
    const wrapper = shallow(<PrivateRoute />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })

})

