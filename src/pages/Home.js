// @flow
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Card } from '../style/Card'
import DayOfWeek from '../components/DayOfWeek'
import firebase from '../fire'
import UsersList from '../components/UsersList'

const DateText = styled.p`
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: .8rem;
`

const Title = styled.h3`
  display: inline-block;
  font-weight: normal;
  font-size: 2.5rem;
  margin-top: 0;
  margin-bottom: 0;
`

const PersonName = styled.span`
  font-weight: bold;
`

const ContentHolder = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px;
`

const Icon = styled.div`
  font-size: 4rem;
`

const LoadingBox = styled.div`
  height: 2.9rem;
  width: 200px;
  background-color: #eee;
`

type State = {
  isLoaded: boolean,
  users: Array<Object>,
  activeUserIndex: number,
  activeUserName: string
}

class Home extends Component<{}, State> {
  constructor() {
    super()

    this.state = {
      isLoaded: false,
      users: [],
      activeUserIndex: 0,
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
        users,
        activeUserIndex,
        activeUserName: users[activeUserIndex].name
      })
    })
  }

  render() {
    return (
      <Fragment>
        <Card>
          <DateText>🗓 This week: <DayOfWeek dayIndex={5} /></DateText>
          <ContentHolder>
            <div>
              {!this.state.isLoaded ?
                <LoadingBox />
                  :
                <Title>Hi <PersonName>{this.state.activeUserName}!</PersonName></Title>
              }
              <p>It is your turn to pick this week.</p>
            </div>
            <Icon role="presentation">🍔</Icon>
          </ContentHolder>
          <UsersList users={this.state.users} activeUserIndex={this.state.activeUserIndex} />
        </Card>
      </Fragment>
    )
  }
}

export default Home