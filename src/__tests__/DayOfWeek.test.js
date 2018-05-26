import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import DayOfWeek from '../components/DayOfWeek'

describe('Date component', () => {
  it('Render Friday as default', () => {
    const wrapper = shallow(<DayOfWeek />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('Renders Tuesday in text within', () => {
    const wrapper = shallow(<DayOfWeek dayIndex={2} />)

    expect(wrapper.text()).toContain('Tuesday')
  })

  it('test number out of week', () => {
    const wrapper = shallow(<DayOfWeek dayIndex={9} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
