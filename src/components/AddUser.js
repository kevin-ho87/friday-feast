// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Card } from '../style/Card'
import { Button } from '../style/Button'

const AddHolder = styled.form`
  display: flex;
  input {
    flex: 1 1 auto;
    margin-right: .2rem;
  }
`

type Props = {
  onAddUser: (string) => void
}

type State = {
  value: string
}

class AddUser extends React.Component<Props, State> {
  addUser: () => void
  handleChange: () => void

  constructor() {
    super()

    this.state = {
      value: ''
    }

    this.addUser = this.addUser.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  addUser(event: SyntheticEvent<>) {
    event.preventDefault()

    const trimmedVal: string = this.state.value.trim()

    if (trimmedVal) {
      this.props.onAddUser(trimmedVal)
      this.setState({
        value: ''
      })
    }
  }

  handleChange(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({
      value: event.currentTarget.value
    })
  }

  render() {
    return (
      <Card>
        <AddHolder onSubmit={this.addUser}>
          <input name="user-name"
            value={this.state.value}
            onChange={this.handleChange}
            type="text" />
          <Button type="submit">Add person</Button>
        </AddHolder>
      </Card>
    )
  }
}

export default AddUser