// @flow
import React, { Component } from 'react'
import UserItem from '../components/UserItem'
import styled from 'styled-components'
import firebase from '../fire'

const SaveHolder = styled.div`
  background-color: #fff;
  padding: 1rem;
  margin-top: 1rem;
`

type State = {
  value: string,
  users: Array<Object>,
  uid: number
}

class Admin extends Component<{}, State> {
  handleChange: () => void
  addUser: () => void
  onRemove: () => void
  handleUserEdit: () => void
  onMove: () => void
  saveData: () => void

  constructor() {
    super()

    this.state = {
      value: '',
      users: [],
      uid: 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.addUser = this.addUser.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.handleUserEdit = this.handleUserEdit.bind(this)
    this.onMove = this.onMove.bind(this)
    this.saveData = this.saveData.bind(this)
  }

  handleChange(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({
      value: event.currentTarget.value
    })
  }

  addUser(event: SyntheticEvent<>) {
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

  componentDidMount() {
    //Firebase in here
    const itemsRef = firebase.database().ref('users')
    const currUID = firebase.database().ref('usersCurrentUID')

    itemsRef.once('value', (snapshot) => {
      this.setState({
        users: snapshot.val()
      })
    })

    currUID.once('value', (snapshot) => {
      this.setState({
        uid: snapshot.val()
      })
    })
  }

  saveData() {
    //Firebase in here
    const itemsRef = firebase.database().ref('users')
    const currUID = firebase.database().ref('usersCurrentUID')
    itemsRef.set(this.state.users)
    currUID.set(this.state.uid)
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

        <form onSubmit={this.addUser}>
          <input name="user-name"
            value={this.state.value}
            onChange={this.handleChange}
            type="text"/>
          <button type="submit">Add</button>
        </form>

        {this.state.users.length > 0 &&
          <ul>{userList}</ul>
        }

        <SaveHolder>
          <button type="button" onClick={this.saveData}>Save</button>
          <button type="button">Cancel</button>
        </SaveHolder>
      </div>
    )
  }
}

export default Admin