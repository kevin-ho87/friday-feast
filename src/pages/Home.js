// @flow
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import DayOfWeek from '../components/DayOfWeek'
import firebase from '../fire'

const Holder = styled.div`
  background-color: #fff;
  width: 400px;
  padding: 1rem;
  border-left: 4px solid #444;
`

type State = {
  isLoaded: boolean,
  activeUserName: string
}

class Home extends Component<{}, State> {
  constructor() {
    super()

    this.state = {
      isLoaded: false,
      activeUserName: ''
    }
  }

  componentDidMount() {
    //Firebase in here
    const itemsRef = firebase.database().ref('users').once('value')
    const activeUserIndex = firebase.database().ref('activeUserKey').once('value')

    let promises = [itemsRef, activeUserIndex]

    Promise.all(promises).then(values => {
      const users = values[0].val()
      const activeUserIndex: number = values[1].val()

      this.setState({
        isLoaded: true,
        activeUserName: users[activeUserIndex].name
      })
    })
  }

  render() {
    return (
      <Holder>
        { !this.state.isLoaded ?
          <p>Rendering...</p>
        :
          <Fragment>
            <h1>Hi {this.state.activeUserName}! It is your turn this week!</h1>
            <DayOfWeek dayIndex={5} />
          </Fragment>
        }
      </Holder>
    )
  }
}

export default Home