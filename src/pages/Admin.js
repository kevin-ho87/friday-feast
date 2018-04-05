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
    console.log('user edited', newText, id)
  }

  render() {
    const userList = this.state.users.map(user => {
      return (
        <li key={user.uid}>
          <UserItem
            name={user.name}
            uid={user.uid}
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

        {this.state.users.length > 0 &&
          <ul>{userList}</ul>
        }

        <form onSubmit={this.handleSubmit}>
          <input name="user-name"
            value={this.state.value}
            onChange={this.handleChange}
            type="text"/>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default Admin