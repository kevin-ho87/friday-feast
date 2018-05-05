// @flow
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import DayOfWeek from '../components/DayOfWeek'
import firebase from '../fire'

const Holder = styled.div`
  background-color: #fff;
  padding: 1rem;
  width: 300px;
`

const LoadingBox = styled.div`
  height: 2rem;
  width: 100px;
  background-color: #eee;
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
      <Fragment>
        <Holder>
          <p>This week: <DayOfWeek dayIndex={5} /></p>
          {!this.state.isLoaded ?
            <LoadingBox></LoadingBox>
            :
            <p>{this.state.activeUserName}</p>
          }
        </Holder>
      </Fragment>
    )
  }
}

export default Home