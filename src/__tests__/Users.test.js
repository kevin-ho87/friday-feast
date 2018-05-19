import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import 'jest-styled-components'
import Users from '../components/Users'

describe('Should render Users component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Users />);
  });

  it('snapshot should work', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('Should render 2 items', () => {
    wrapper.setState({
      users: [
        { name: 'Megatron', uid: 4 },
        { name: 'Jojo', uid: 6 }
      ]
    })

    expect(wrapper.find('UserItem')).toHaveLength(2)
  })

  it('Active user should highlight', () => {
    wrapper.setState({
      users: [
        { name: 'Megatron', uid: 4 },
        { name: 'Jojo', uid: 6 }
      ],
      uid: 7,
      activeUserIndex: 1
    })

    expect(wrapper.find('UserItem').at(1).props().isActive).toEqual(true)
  })

  it('Snapshot compare saveholder disabled prop should be false', () => {
    wrapper.setState({
      users: [
        { name: 'Megatron', uid: 4 },
        { name: 'Jojo', uid: 6 }
      ],
      uid: 7,
      activeUserIndex: 0,
      snapshot: {
        users: [{ name: 'Something new', uid: 2 }],
        uid: 7,
        activeUserIndex: null
      }
    })

    expect(wrapper.find('Users__SaveHolder Button').at(1).props().disabled).toEqual(false)
  })

  it('Snapshot deep compare saveholder disabled prop should be false', () => {
    wrapper.setState({
      users: [
        { name: 'Megatron', uid: 4 },
        { name: 'Jojo', uid: 6, test: { name: 'test', age: 4 } }
      ],
      uid: 7,
      activeUserIndex: 0,
      snapshot: {
        users: [
          { name: 'Megatron', uid: 4 },
          { name: 'Jojo', uid: 6, test: { name: 'test!', age: 5 } }
        ],
        uid: 7,
        activeUserIndex: 0
      }
    })

    expect(wrapper.find('Users__SaveHolder Button').at(1).props().disabled).toEqual(false)
  })

  it('Snapshot compare saveholder disabled prop should be true', () => {
    wrapper.setState({
      users: [
        { name: 'Megatron', uid: 4 }
      ],
      uid: 7,
      activeUserIndex: 0,
      snapshot: {
        users: [{ name: 'Megatron', uid: 4 }],
        uid: 7,
        activeUserIndex: 0
      }
    })

    expect(wrapper.find('Users__SaveHolder Button').at(1).props().disabled).toEqual(true)
  })

  it('Window confirm to be called', () => {
    window.confirm = jest.fn(() => true)

    const mountwrapper = mount(<Users />)

    mountwrapper.setState({
      users: [
        { name: 'Megatron', uid: 4 }
      ],
      uid: 7,
      activeUserIndex: 0,
      snapshot: {
        users: [{ name: 'Chopper', uid: 4 }],
        uid: 7,
        activeUserIndex: 0
      }
    })

    mountwrapper.find('Users__SaveHolder Button').at(1).simulate('click')

    expect(window.confirm).toBeCalled()
  })

  it('addUser fn called', () => {
    const addMock = jest.fn()
    wrapper.instance().addUser = addMock
    wrapper.update()
    wrapper.instance().addUser('gg')
    expect(addMock).toBeCalledWith('gg')
  })

  it('addUser fn test snapshot', () => {
    const mountwrapper = mount(<Users />)
    mountwrapper.setState({
      users: [
        { name: 'Megatron', uid: 4 },
        { name: 'GG', uid: 6 }
      ],
      uid: 7
    })

    const theInput = mountwrapper.find('AddUser input')
    theInput.instance().value = "totoro"
    theInput.simulate('change')

    mountwrapper.find('AddUser Button').simulate('submit')

    expect(toJson(mountwrapper)).toMatchSnapshot()
    // expect(mountwrapper.find('UserItem')).toHaveLength(4)
  })

  it('Check active user set when last user deleted', () => {
    const mountwrapper = mount(<Users />)
    mountwrapper.setState({
      users: [
        { name: 'Jojo', uid: 3 },
        { name: 'Megatron', uid: 4 },
        { name: 'GG', uid: 6 }
      ],
      uid: 7,
      activeUserIndex: 2
    })

    mountwrapper.find('UserItem').at(2).find('Button').at(3).simulate('click')
    expect(mountwrapper.find('UserItem').at(1).props().isActive).toEqual(true)
  })

  it('Edit particular user name', () => {
    const mountwrapper = mount(<Users />)
    mountwrapper.setState({
      users: [
        { name: 'Jojo', uid: 3 },
        { name: 'Megatron', uid: 4 }
      ]
    })

    mountwrapper.find('UserItem').at(0).find('Button').at(2).simulate('click')

    const theInput = mountwrapper.find('UserItem').at(0).find('input')
    theInput.instance().value = "Totoro"
    theInput.simulate('change')

    mountwrapper.find('UserItem').at(0).find('form').find('Button').at(0).simulate('submit')

    expect(mountwrapper.find('UserItem').at(0).props().name).toEqual('Totoro')
  })

  it('Moved user item')
})


