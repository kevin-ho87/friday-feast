// @flow
import * as React from 'react'
import styled from 'styled-components'

const Holder = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-bottom: 1px solid #eee;
`

const ItemText = styled.span`
  display: inline-block;
  padding: 1rem;
  margin-right: 1rem;
`

const Button = styled.button`
  display: inline-block;
  font-size: 1rem;
  color: #fff;
  padding: 1rem;
  margin: .2rem;
  background-color: #FF5A5F;
  border: 0;
  border-radius: 3px;
`

type Props = {
  name: string,
  uid: number,
  onRemove: (number) => void,
  userEdited: (string, number) => void
}

type State = {
  isEdit: boolean,
  name: string
}

class UserItem extends React.Component<Props, State> {
  input: ?HTMLInputElement
  removeHandler: () => void
  triggerEdit: () => void
  cancelEdit: () => void
  handleSet: () => void
  onNameChange: () => void

  constructor(props: Props) {
    super(props)

    this.state = {
      isEdit: false,
      name: this.props.name
    }

    this.removeHandler = this.removeHandler.bind(this)
    this.triggerEdit = this.triggerEdit.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
    this.handleSet = this.handleSet.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
  }

  removeHandler() {
    const { uid } = this.props
    this.props.onRemove(uid)
  }

  triggerEdit() {
    // console.log('edit click')
    this.setState({ isEdit: true }, () => {
      this.input.focus()
    })
  }

  cancelEdit() {
    // console.log('cancel edit')
    this.setState({
      isEdit: false,
      name: this.props.name
    })
  }

  handleSet(event: SyntheticEvent<>) {
    event.preventDefault()

    this.props.userEdited(this.state.name, this.props.uid)
    this.setState({
      isEdit: false
    })
  }

  onNameChange(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({
      name: event.currentTarget.value
    })
  }

  render() {
    return (
      <Holder>
        { this.state.isEdit ?
          (
            <div>
              <form onSubmit={this.handleSet}>
                <input
                  ref={input => (this.input = input)}
                  value={this.state.name}
                  onChange={this.onNameChange}
                  type="text"/>
                <Button type="submit">Set</Button>
              </form>
              <Button type="button" onClick={this.cancelEdit}>Cancel</Button>
            </div>
          )
          :
          (
            <div>
              <ItemText>{ this.props.name }</ItemText>
              <Button type="button" onClick={this.triggerEdit}>Edit</Button>
              <Button type="button" onClick={this.removeHandler}>Delete</Button>
            </div>
          )
        }
      </Holder>
    )
  }
}

export default UserItem