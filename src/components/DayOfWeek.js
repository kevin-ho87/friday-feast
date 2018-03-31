import React from 'react'

const DayOfWeek = ({dayIndex = 5}) => {
  const today = new Date()
  const theDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + dayIndex * 1)

  return (
    <p>{`
      ${theDay.toLocaleString('en-GB', { weekday: "long" })}
      ${theDay.getDate()}
      ${theDay.toLocaleString('en-GB', { month: "long" })}
      ${theDay.getFullYear()}
    `}</p>
  )
}

export default DayOfWeek