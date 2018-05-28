// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Button, AltButton } from '../style/Button'

const Holder = styled.div`
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  background-color: ${props => props.isActive ? 'papayawhip' : '#fff' };
`

const EditForm = styled.form`
  flex: 1 1 auto;
  display: grid;
  grid-template-columns: 1fr repeat(2, auto);
  grid-column-gap: .2rem;
`

const ListBox = styled.div`
  flex: 1 1 auto;
  display: grid;
  grid-template-columns: 1fr repeat(3, auto);
  grid-column-gap: .2rem;
`

const ItemText = styled.span`
  padding: 1rem;
`

const DirectionButtons = styled.div`
  display: grid;
  grid-row-gap: .2rem;
  margin-right: .2rem;
`

const ArrowButton = AltButton.extend`
  padding: 0 0.3rem;
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

  static getDerivedStateFromProps(nextProps: Object, prevState: Object) {
    // When new props come in, update input field value that is not saved
    if (nextProps.name !== prevState.name) {
      return {
        name: nextProps.name
      }
    }

    return null
  }

  removeHandler() {
    if (window.confirm('Are you sure you want to delete this user?')) {
      this.props.onRemove(this.props.uid)
    }
  }

  triggerEdit() {
    this.setState({ isEdit: true }, () => {
      if ( this.myInput ) {
        this.myInput.focus()
      }
    })
  }

  cancelEdit() {
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

  markupIsEditHolder = () => {
    return (
      <EditForm onSubmit={this.handleSet}>
        <input
          ref={input => { this.myInput = input }}
          value={this.state.name}
          onChange={this.onNameChange}
          type="text" />
        <Button type="submit">Set</Button>
        <AltButton type="button" onClick={this.cancelEdit}>Cancel</AltButton>
      </EditForm>
    )
  }

  markupIsNotEditHolder = () => {
    return (
      <ListBox>
        <ItemText>{this.props.name}</ItemText>
        <Button type="button" onClick={this.triggerEdit}>Edit</Button>
        <Button type="button" onClick={this.removeHandler}>Delete</Button>
        <AltButton type="button" disabled={this.props.isActive ? true : false} onClick={this.setActive}>Set as active</AltButton>
      </ListBox>
    )
  }

  markupDirectionButtonsHolder = () => {
    return (
      <DirectionButtons>
        <ArrowButton type="button" title="Up" onClick={this.move.bind(this, -1)}>↑</ArrowButton>
        <ArrowButton type="button" title="Down" onClick={this.move.bind(this, 1)}>↓</ArrowButton>
      </DirectionButtons>
    )
  }

  render() {
    return (
      <Holder isActive={this.props.isActive && true}>
        { this.markupDirectionButtonsHolder() }
        { this.state.isEdit ? this.markupIsEditHolder() : this.markupIsNotEditHolder() }
      </Holder>
    )
  }
}

export default UserItem