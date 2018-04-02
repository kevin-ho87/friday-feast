// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import DayOfWeek from '../components/DayOfWeek'

const Holder = styled.div`
  font-family: sans-serif;
  background-color: #eee;
  width: 400px;
  padding: 1rem;
  border-left: 4px solid #444;
`

class Home extends Component<void> {
  render() {
    return (
      <Holder>
        <h1>Hi Megatron! It is your turn this week!</h1>
        <DayOfWeek dayIndex={5} />
      </Holder>
    )
  }
}

export default Home