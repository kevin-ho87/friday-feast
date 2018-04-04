// @flow
import * as React from 'react'
import styled from 'styled-components'

const Holder = styled.div`
  background-color: #fff;
  padding: 1rem;
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
  background-color: #FF5A5F;
  border: 0;
  border-radius: 3px;
`

type Props = {
  name: string,
  uid: number,
  onRemove: (number) => void
}

class UserItem extends React.Component<Props> {
  removeHandler: () => void

  constructor() {
    super()

    this.removeHandler = this.removeHandler.bind(this)
  }

  removeHandler() {
    const { name, uid } = this.props
    this.props.onRemove(uid)
  }

  render() {
    return (
      <Holder>
        <ItemText>{ this.props.name }</ItemText>
        <Button type="button" onClick={this.removeHandler}>Delete</Button>
      </Holder>
    )
  }
}

export default UserItem