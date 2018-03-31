// @flow
import React, { Component } from 'react'
import DayOfWeek from '../components/DayOfWeek'

class Home extends Component<void> {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <h1>Homepage</h1>
        <p>Whose turn is it this friday?</p>
        <DayOfWeek dayIndex={5} />
      </div>
    )
  }
}

export default Home