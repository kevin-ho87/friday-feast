// @flow
import * as React from 'react'
import styled from 'styled-components'

const ListHolder = styled.ul`
  margin-top: .5rem;
  margin-bottom: 0;
`

const List = styled.li`
  background-color: ${props => props.isActive ? '#eee' : '#fff'};
  padding: .5rem;
  border-top: 1px solid #eee;
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
    <ListHolder>
      {userList}
    </ListHolder>
  )
}

export default UsersList