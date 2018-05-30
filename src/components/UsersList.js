// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Card } from '../style/Card'

const ListHolder = styled.ul`
  margin: 0;
`

const List = styled.li`
  background-color: ${props => props.isActive ? 'papayawhip' : '#fff'};
  padding: .5rem;
`

type Props = {
  users: Array<Object>,
  activeUserIndex: number
}

const UsersList = ({ users, activeUserIndex }: Props) => {
  const userList = users.map((item, index) => {
    const isActive = activeUserIndex === index ? true : false

    return (
      <List key={item.uid} isActive={isActive}>
        {item.name}
      </List>
    )
  })

  return (
    <Card>
      <ListHolder>
        {userList}
      </ListHolder>
    </Card>
  )
}

export default UsersList