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

  it('Displays usertext at start', () => {
    const wrapper = shallow(<UserItem
      name="Megatron"
    />)

    expect(wrapper.find('UserItem__ListBox')).toHaveLength(1)
  })
})

describe('UserItem component edit actions', () => {
  it('Displays edit form when in edit mode', () => {
    const wrapper = shallow(<UserItem name="Megatron" />)

    wrapper.find('UserItem__ListBox').find('Button').at(0).simulate('click')
    expect(wrapper.find('UserItem__EditForm')).toHaveLength(1)
  })

  it('Input change updates state', () => {
    const wrapper = mount(<UserItem name="gg" />)

    wrapper.setState({ isEdit: true })

    const theInput = wrapper.find('input')
    theInput.instance().value = 'totoro'
    theInput.simulate('change')

    expect(wrapper.state('name')).toEqual('totoro')
  })

  it('New name prop data should overwrite name state', () => {
    const wrapper = shallow(<UserItem name="Megatron" />)

    wrapper.setState({ name: 'Zoro' })
    wrapper.setProps({ name: 'Chopper' })

    expect(wrapper.state('name')).toEqual('Chopper')
  })
})

describe('UserItem component setActive actions', () => {
  it('Component active state', () => {
    const wrapper = shallow(<UserItem isActive="true" />)

    expect(wrapper.props().isActive).toEqual(true)
  })

  it('onActiveUser fn prop did call on active set', () => {
    const mockActive = jest.fn()
    const wrapper = shallow(<UserItem index={2} onActiveUser={mockActive} />)

    wrapper.find('UserItem__ListBox').find('Button').at(2).simulate('click')

    expect(mockActive).toBeCalledWith(2)
  })

  it('Component when active, set active button is disabled', () => {
    const wrapper = shallow(<UserItem isActive="true" />)
    const activeBtn = wrapper.find('UserItem__ListBox').find('Button').at(2)
    expect(activeBtn.props().disabled).toEqual(true)
  })

})

describe('UserItem component delete actions', () => {
  it('Window Modal confirm calls', () => {
    window.confirm = jest.fn()
    const wrapper = shallow(<UserItem />)

    wrapper.find('UserItem__ListBox').find('Button').at(1).simulate('click')

    expect(window.confirm).toBeCalled()
  })

  it('onRemove fn prop did call with uid', () => {
    const mockRemove = jest.fn()
    window.confirm = jest.fn(() => true) // Mock modal clicked ok
    const wrapper = shallow(<UserItem uid={3} onRemove={mockRemove} />)

    wrapper.find('UserItem__ListBox').find('Button').at(1).simulate('click')

    expect(mockRemove).toBeCalledWith(3)
  })
})