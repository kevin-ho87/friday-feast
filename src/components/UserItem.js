// @flow
import * as React from 'react'
import styled from 'styled-components'

const Holder = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  background-color: ${props => props.isActive && 'papayawhip'};
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
  onMove: (?number, number) => void
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
    // this.move = this.move.bind(this)
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