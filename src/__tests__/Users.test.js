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

    const mountwrapper = mount(<Users />);

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
})


