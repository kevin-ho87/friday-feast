// @flow
import React, { Component, Fragment } from 'react'
import UserItem from '../components/UserItem'
import AddUser from '../components/AddUser'
import styled from 'styled-components'
import firebase from '../fire'
import { isEqual } from 'lodash'
import { Button, AltButton } from '../style/Button'
import { PlaceholderUsers } from '../style/PlaceholderUsers'

const Page = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
`

const SaveHolder = styled.div`
  background-color: #fff;
  padding: 1rem;
  margin-top: 1rem;

  button {
    margin-right: .2rem;
  }
`

type State = {
  users: Array<Object>,
  uid: number,
  activeUserIndex: ?number,
  isChanged: boolean,
  snapshot: Object
}

class Users extends Component<{}, State> {
  addUser: () => void
  onRemove: () => void
  handleUserEdit: () => void
  onMove: () => void
  saveData: () => void
  resetData: () => void
  setActiveUser: () => void

  constructor() {
    super()

    this.state = {
      users: [],
      uid: 0,
      activeUserIndex: null,
      isChanged: false,
      snapshot: {
        users: [],
        uid: null,
        activeUserIndex: null
      }
    }

    this.addUser = this.addUser.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.handleUserEdit = this.handleUserEdit.bind(this)
    this.onMove = this.onMove.bind(this)
    this.saveData = this.saveData.bind(this)
    this.resetData = this.resetData.bind(this)
    this.setActiveUser = this.setActiveUser.bind(this)
  }

  addUser(name: String) {
    const userObj = {
      name,
      uid: this.state.uid
    }

    this.setState((prevState) => ({
      users: [...prevState.users, userObj],
      uid: prevState.uid + 1
    }))

  }

  checkActiveUserSet = () => {
    // on delete, set active user to last item in user array if current active user is already the last item
    const usersLength = this.state.users.length
    const { activeUserIndex } = this.state

    this.setState(prevState => {
      if ((typeof prevState.activeUserIndex === 'number') && (usersLength <= prevState.activeUserIndex)) {
        return ({
          activeUserIndex: prevState.activeUserIndex -1
        })
      }
    })
  }

  onRemove(id: number) {
    this.setState(prevState => ({
      users: prevState.users.filter(item => item.uid !== id)
    }), () => {
      this.checkActiveUserSet()
    })
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
    const arrFire = ['users', 'usersCurrentUID', 'activeUserKey']
    const arrState = ['users', 'uid', 'activeUserIndex']

    arrFire.forEach((item, index) => {
      firebase.database().ref(item).on('value', snapshot => {
        let newState = {}
        newState[arrState[index]] = snapshot.val()

        this.setState((prevState, props) => ({
          ...newState,
          snapshot: {
            ...prevState.snapshot,
            ...newState
          }
        }))
      })
    })
  }

  componentWillUnmount() {
    firebase.database().ref('users').off()
    firebase.database().ref('usersCurrentUID').off()
    firebase.database().ref('activeUserKey').off()
  }

  componentDidUpdate(prevProps: Object, prevState: Object) {
    const currState = {
      users: [...this.state.users],
      uid: this.state.uid,
      activeUserIndex: this.state.activeUserIndex
    }

    // Compare original state with current
    const didChanged = !isEqual(this.state.snapshot, currState)

    if (prevState.isChanged !== didChanged) {
      this.setState({
        isChanged: didChanged
      })
    }
  }

  saveData() {
    //Firebase in here
    const itemsRef = firebase.database().ref('users')
    const currUID = firebase.database().ref('usersCurrentUID')
    const activeUserKey = firebase.database().ref('activeUserKey')

    itemsRef.set(this.state.users)
    currUID.set(this.state.uid)
    activeUserKey.set(this.state.activeUserIndex)
  }

  resetData() {
    // Revert back to saved state from firebase
    if (!window.confirm('Are you sure you want to cancel your changes?')) {
      return
    }

    const { users, uid, activeUserIndex } = this.state.snapshot

    this.setState({
      users: [...users],
      uid,
      activeUserIndex
    })
  }

  setActiveUser(index: number) {
    this.setState({
      activeUserIndex: index
    })
  }

  markupSaveHolder = () => {
    return (
      <SaveHolder>
        <Button type="button"
          disabled={!this.state.isChanged}
          onClick={this.saveData}
          >Save</Button>
        <AltButton type="button"
          disabled={!this.state.isChanged}
          onClick={this.resetData}
          >Cancel</AltButton>
      </SaveHolder>
    )
  }

  render() {
    const userList = this.state.users.map((user, index) => {
      return (
        <li key={user.uid}>
          <UserItem
            name={user.name}
            index={index}
            uid={user.uid}
            isActive={this.state.activeUserIndex === index && true}
            onMove={this.onMove}
            userEdited={this.handleUserEdit}
            onRemove={this.onRemove}
            onActiveUser={this.setActiveUser}
          />
        </li>
      )
    })

    return (
      <Page>
        <AddUser onAddUser={this.addUser} />
        {
          this.state.users.length > 0 ?
          <Fragment>
            <ul>{userList}</ul>
            {this.markupSaveHolder()}
          </Fragment>
          :
          <PlaceholderUsers />
        }
      </Page>
    )
  }
}

export default Users