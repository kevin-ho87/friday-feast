import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Login from '../components/Login'

describe('Login component', () => {
  it('Render snapshot', () => {
    const wrapper = shallow(<Login location={{}} />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('Redirects if authenticated', () => {
    const wrapper = shallow(<Login location={{}} />)

    wrapper.setState({
      redirectToReferrer: true
    })

    expect(wrapper.find('Redirect')).toHaveLength(1)
  })

  it('Button state is disabled on submit', () => {
    firebase.auth.signInWithEmailAndPassword = jest.fn(() => new Promise(resolve => resolve(true)))

    const fakeEvent = { preventDefault: () => console.log('preventDefault') }
    const wrapper = shallow(<Login location={{}} />)

    wrapper.find('form').first().simulate('submit', fakeEvent)

    expect(wrapper.find('Button').props().disabled).toEqual(true)
  })

  it('Check firebase auth signin calls username and password', () => {
    firebase.auth.signInWithEmailAndPassword = jest.fn(() => new Promise(resolve => resolve(true)))

    const fakeEvent = { preventDefault: () => console.log('preventDefault') }
    const wrapper = shallow(<Login location={{}} />)

    wrapper.setState({
      username: 'totoro',
      password: 'ggg'
    })

    wrapper.find('form').first().simulate('submit', fakeEvent)

    expect(firebase.auth.signInWithEmailAndPassword).toBeCalledWith('totoro','ggg')
  })

  it('Signing in Message show', () => {
    firebase.auth.signInWithEmailAndPassword = jest.fn(() => new Promise(resolve => resolve(true)))

    const fakeEvent = { preventDefault: () => console.log('preventDefault') }
    const wrapper = shallow(<Login location={{}} />)

    wrapper.find('form').first().simulate('submit', fakeEvent)

    expect(wrapper.find('p')).toHaveLength(1)
  })
})
