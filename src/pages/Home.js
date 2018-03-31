// @flow
import React, { Component } from 'react'
import DayOfWeek from '../components/DayOfWeek'

class Home extends Component<void> {
  render() {
    return (
      <div>
        <h1>Hi Megatron! It is your turn this week!</h1>
        <DayOfWeek dayIndex={5} />
      </div>
    )
  }
}

export default Home