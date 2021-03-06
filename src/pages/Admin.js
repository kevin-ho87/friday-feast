// @flow
import React, { Component } from 'react'
import AsyncLoader from '../components/AsyncLoader'
import { auth } from '../fire'
import { Button } from '../style/Button'
import { Card } from '../style/Card'
import styled from 'styled-components'

const Users = AsyncLoader(() => import('../components/Users'))

const Page = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
`

const Welcome = styled.div`
  display: grid;
  grid-template-columns: 1fr 100px;

  h1 {
    margin-top: 0.5rem;
  }
`

const Label = styled.label`
  display: block;
  margin-bottom: .2rem;
`

const FormRow = styled.div`
  margin-bottom: 1rem;
`

const Input = styled.input`
  width: 100%;
`

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
      <Page>
        <Welcome>
          <h1>Welcome back!</h1>
          <div>
            <Button type="button" onClick={() => auth.signOut()}>Sign out</Button>
          </div>
        </Welcome>

        <Users />
      </Page>
    )
  }

  markupNotSignedIn = () => {
    return (
      <Card>
        <form onSubmit={this.signIn}>
          <FormRow>
            <Label>Username</Label>
            <Input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
          </FormRow>
          <FormRow>
            <Label>Password</Label>
            <Input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          </FormRow>
          <Button type="submit" disabled={this.state.isSigningIn && true}>Sign in</Button>
        </form>
        {this.state.isSigningIn && <p>Signing in...</p>}
      </Card>
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