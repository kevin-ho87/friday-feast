// @flow
import React, { Component, Fragment } from 'react'
import AsyncLoader from '../components/AsyncLoader'
import { auth } from '../fire'

const Users = AsyncLoader(() => import('../components/Users'))

type State = {
  username: string,
  password: string,
  isChecking: boolean,
  signedIn: boolean,
  isSigningIn: boolean
}

class Admin extends Component<{}, State> {
  handleChange: () => void
  signIn: () => void
  removeAuthListener: () => void

  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
      isChecking: true,
      signedIn: false,
      isSigningIn: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.signIn = this.signIn.bind(this)
  }

  componentDidMount() {
    this.removeAuthListener = auth.onAuthStateChanged(user => {
      this.setState({
        signedIn: !!user,
        isChecking: false
      })
    })
  }

  componentWillUnmount() {
    this.removeAuthListener()
  }

  handleChange(event: SyntheticEvent<HTMLInputElement>) {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  signIn(event: SyntheticEvent<>) {
    event.preventDefault()
    console.log('signing in in')

    this.setState({
      isSigningIn: true
    })

    const { username, password } = this.state

    auth.signInWithEmailAndPassword(username, password)
      .then(() => {
        console.log('success')
        this.setState({
          signedIn: true
        })
      })
      .catch(error => {
        alert(error.message)
      })
      .then(() => {
        this.setState({
          username: '',
          password: '',
          isSigningIn: false
        })
      })
  }

  markupIsSignedIn() {
    return (
      <Fragment>
        <button type="button" onClick={() => auth.signOut()}>Sign out</button>
        <Users />
      </Fragment>
    )
  }

  markupNotSignedIn = () => {
    return (
      <form onSubmit={this.signIn}>
        <div>
          <label htmlFor="">Username</label>
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
        </div>
        <button type="submit" disabled={this.state.isSigningIn && true}>Sign in</button>
        {this.state.isSigningIn && <p>Signing in.......</p>}
      </form>
    )
  }

  render() {
    if (this.state.isChecking) {
      return (
        <p>Authenticating.....</p>
      )
    }

    return (
      <div>
        {
          this.state.signedIn
          ? this.markupIsSignedIn()
          : this.markupNotSignedIn()
        }
      </div>
    )
  }
}

export default Admin