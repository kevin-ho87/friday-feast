import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import AddUser from '../components/AddUser'

describe('AddUser component', () => {
  it('Render AddUser snapshot', () => {
    const wrapper = shallow(<AddUser />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('Should have input field', () => {
    const wrapper = shallow(<AddUser />)

    expect(wrapper.find('input')).toHaveLength(1)
  })

  it('State change should work', () => {
    const wrapper = mount(<AddUser />)

    const theInput = wrapper.find('input')
    theInput.instance().value = 'Megatron'
    theInput.simulate('change')

    expect(wrapper.state('value')).toEqual('Megatron')
  })

  it('Form submit should call with value', () => {
    const mockFn = jest.fn()
    const wrapper = mount(<AddUser onAddUser={mockFn} />)

    wrapper.setState({
      value: 'Chopper'
    })

    wrapper.find('Button').simulate('submit')

    expect(mockFn).toBeCalledWith('Chopper')
  })

  it('Form submit should reset state value', () => {
    const wrapper = mount(<AddUser onAddUser={jest.fn()} />)

    wrapper.setState({
      value: 'Nami'
    })

    wrapper.find('Button').simulate('submit')

    expect(wrapper.state('value')).toEqual('')
  })
})
