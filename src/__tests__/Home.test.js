import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import Home from '../pages/Home'

describe('Should render Home page/component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Home />)
  })

  it('shallow snapshot should work', () => {
    const shallowWrapper = shallow(<Home />)
    expect(toJson(shallowWrapper)).toMatchSnapshot()
  })

  it('mounted snapshot should work', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('shallow snapshot with data', () => {
    const shallowWrapper = shallow(<Home />)

    shallowWrapper.setState({
      isLoaded: true,
      users: [
        { name: 'Megatron', uid: 4 },
        { name: 'Jojo', uid: 6 }
      ],
      activeUserName: 'Megatron'
    })

    expect(toJson(shallowWrapper)).toMatchSnapshot()
  })

  it('edit state data', () => {
    wrapper.setState({
      isLoaded: true,
      activeUserName: 'Megatron'
    })

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('if users empty, dont render list', () => {
    expect(wrapper.find('UsersList')).toHaveLength(0)
  })

  it('if have users, render list', () => {
    wrapper.setState({
      isLoaded: true,
      users: [
        { name: 'Megatron', uid: 4 },
        { name: 'Jojo', uid: 6 }
      ],
      activeUserName: 'Megatron'
    })

    expect(wrapper.find('UsersList')).toHaveLength(1)
  })

  it('if only one user, dont render list', () => {
    wrapper.setState({
      isLoaded: true,
      users: [
        { name: 'Megatron', uid: 4 }
      ],
      activeUserName: 'Megatron'
    })

    expect(wrapper.find('UsersList')).toHaveLength(0)
  })


})
