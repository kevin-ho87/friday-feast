import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import DayOfWeek from '../components/DayOfWeek'

describe('Date component should render', () => {
  it('test enzyme snapshot works', () => {
    const wrapper = shallow(<DayOfWeek />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('test enzyme renders Tuesday in snapshot', () => {
    const wrapper = shallow(<DayOfWeek dayIndex={2} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
