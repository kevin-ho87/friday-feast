import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import UsersList from '../components/UsersList'

const users = [{
  name: "Megatron",
  uid: 0
}, {
  name: "Totoro",
  uid: 1
}]

describe('UserItem component', () => {
  it('Render snapshot', () => {
    const wrapper = shallow(<UsersList users={users} />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('Render snapshot', () => {
    const wrapper = shallow(<UsersList users={users} activeUserIndex={1} />)

    expect(wrapper.find('UsersList__List').at(1).props().isActive).toEqual(true)
  })
})
