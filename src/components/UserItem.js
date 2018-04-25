// @flow
import * as React from 'react'
import styled from 'styled-components'

const Holder = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  background-color: ${props => props.isActive ? 'papayawhip' : '#fff' };
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
  index: number,
  isActive: ?boolean,
  onRemove: (number) => void,
  userEdited: (string, number) => void,
  onMove: (?number, number) => void,
  onActiveUser: (number) => void
}

type State = {
  isEdit: boolean,
  name: string
}

class UserItem extends React.Component<Props, State> {
  myInput: ?HTMLInputElement
  removeHandler: () => void
  triggerEdit: () => void
  cancelEdit: () => void
  handleSet: () => void
  onNameChange: () => void
  move: (number) => void
  setActive: () => void

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
    this.setActive = this.setActive.bind(this)
  }

  removeHandler() {
    const { uid } = this.props
    this.props.onRemove(uid)
  }

  triggerEdit() {
    this.setState({ isEdit: true }, () => {
      if ( this.myInput ) {
        this.myInput.focus()
      }
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

  move(dir: number) {
    this.props.onMove(dir, this.props.index)
  }

  setActive() {
    this.props.onActiveUser(this.props.index)
  }

  markupButtonsHolder = () => {
    return (
      <div>
        <ItemText>{this.props.name}</ItemText>
        <Button type="button" onClick={this.triggerEdit}>Edit</Button>
        <Button type="button" onClick={this.removeHandler}>Delete</Button>
        <Button type="button" onClick={this.setActive}>Set as active</Button>
      </div>
    )
  }

  render() {
    return (
      <Holder isActive={this.props.isActive && true}>
        <button type="button" data-dir="-1" onClick={this.move.bind(this,-1)}>⬆️ Up</button>
        <button type="button" data-dir="1" onClick={this.move.bind(this,1)}>⬇️ Down</button>
        { this.state.isEdit ?
          (
            <div>
              <form onSubmit={this.handleSet}>
                <input
                  ref={input => {this.myInput = input}}
                  value={this.state.name}
                  onChange={this.onNameChange}
                  type="text"/>
                <Button type="submit">Set</Button>
              </form>
              <Button type="button" onClick={this.cancelEdit}>Cancel</Button>
            </div>
          )
          : this.markupButtonsHolder()
        }
      </Holder>
    )
  }
}

export default UserItem