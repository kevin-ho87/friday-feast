import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import UserItem from '../components/UserItem'


describe('UserItem component', () => {
  it('Render snapshot', () => {
    const wrapper = shallow(<UserItem
      name="Megatron"
      index="8"
      uid="7"
      isActive="true"
    />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('Component active state', () => {
    const wrapper = shallow(<UserItem
      isActive="true"
    />)

    expect(wrapper.props().isActive).toEqual(true)
  })

  it('Displays usertext at start', () => {
    const wrapper = shallow(<UserItem
      name="Megatron"
    />)

    expect(wrapper.find('UserItem__ListBox')).toHaveLength(1)
  })

  it('Displays edit form when in edit mode', () => {
    const wrapper = shallow(<UserItem
      name="Megatron"
    />)

    wrapper.find('UserItem__ListBox').find('Button').at(0).simulate('click')
    expect(wrapper.find('UserItem__EditForm')).toHaveLength(1)
  })




})

