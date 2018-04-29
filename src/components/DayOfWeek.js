// @flow
import * as React from 'react'

type Props = {
  dayIndex: number
}

const DayOfWeek = ({ dayIndex }: Props) => {
  const today: Date = new Date()
  const theDay: Date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + dayIndex)

  return (
    <React.Fragment>{`
      ${theDay.toLocaleString('en-GB', { weekday: "long" })}
      ${theDay.getDate()}
      ${theDay.toLocaleString('en-GB', { month: "long" })}
      ${theDay.getFullYear()}
    `}</React.Fragment>
  )
}

DayOfWeek.defaultProps = {
  dayIndex: 5
}

export default DayOfWeek