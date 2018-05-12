// @flow
import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { auth } from '../fire'
import { Card } from '../style/Card'
import { Button } from '../style/Button'
import styled from 'styled-components'

const FormRow = styled.div`
  margin-bottom: 1rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: .2rem;
`

const Input = styled.input`
  width: 100%;
`

type Props = {
  location: Object
}

type State = {
  username: string,
  password: string,
  redirectToReferrer: boolean,
  isSigningIn: boolean
}

class Login extends React.Component<Props, State> {
  handleChange: () => void
  signIn: () => void

  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
      redirectToReferrer: false,
      isSigningIn: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.signIn = this.signIn.bind(this)
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
        this.setState({
          redirectToReferrer: true
        })
      })
      .catch(error => {
        alert(error.message)
        this.setState({
          username: '',
          password: '',
          isSigningIn: false
        })
      })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

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
}

export default Login