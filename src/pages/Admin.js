// @flow
import React, { Component } from 'react'
import UserItem from '../components/UserItem'

type State = {
  value: string,
  users: Array<Object>,
  uid: number
}

class Admin extends Component<{}, State> {
  handleChange: () => void
  handleSubmit: () => void
  onRemove: () => void
  handleUserEdit: () => void
  onMove: () => void

  constructor() {
    super()

    this.state = {
      value: '',
      users: [],
      uid: 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.handleUserEdit = this.handleUserEdit.bind(this)
    this.onMove = this.onMove.bind(this)
  }

  handleChange(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({
      value: event.currentTarget.value
    })
  }

  handleSubmit(event: SyntheticEvent<>) {
    event.preventDefault()
    const trimmedVal: string = this.state.value.trim()

    const userObj = {
      name: trimmedVal,
      uid: this.state.uid
    }

    if (trimmedVal) {
      this.setState((prevState) => ({
        users: [...prevState.users, userObj],
        value: '',
        uid: prevState.uid + 1
      }))
    }
  }

  onRemove(id: number) {
    this.setState(prevState => ({
      users: prevState.users.filter(item => item.uid !== id)
    }))
  }

  handleUserEdit(newText: string, id: number) {
    const index: number = this.state.users.findIndex(({ uid }) => uid === id)

    this.setState(prevState => ({
      users: [
        ...prevState.users.slice(0, index),
        {
          ...prevState.users[index],
          name: newText
        },
        ...prevState.users.slice(index + 1)
      ]
    }))
  }

  onMove(direction: number, currIndex: number) {
    const newIndex: number = currIndex + direction

    if (newIndex < 0 || newIndex >= this.state.users.length) {
      return
    }

    const excludedArr = this.state.users.filter((item, index) => index !== currIndex)

    const newArr = [
      ...excludedArr.slice(0, newIndex),
      {
        ...this.state.users[currIndex]
      },
      ...excludedArr.slice(newIndex)
    ]

    this.setState(prevState => ({
      users: newArr
    }))
  }

  render() {
    const userList = this.state.users.map((user, index) => {
      return (
        <li key={user.uid}>
          <UserItem
            name={user.name}
            index={index}
            uid={user.uid}
            onMove={this.onMove}
            userEdited={this.handleUserEdit}
            onRemove={this.onRemove}
          />
        </li>
      )
    })

    return (
      <div>
        <h1>Admin page</h1>
        <p>List of users</p>

        <form onSubmit={this.handleSubmit}>
          <input name="user-name"
            value={this.state.value}
            onChange={this.handleChange}
            type="text"/>
          <button type="submit">Add</button>
        </form>

        {this.state.users.length > 0 &&
          <ul>{userList}</ul>
        }
      </div>
    )
  }
}

export default Admin