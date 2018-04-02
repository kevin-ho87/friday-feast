// @flow
import * as React from 'react'

type Props = {
  name: string
}

class UserItem extends React.Component<Props> {
  render() {
    return (
      <div>
        <span>{ this.props.name }</span>
      </div>
    )
  }
}

export default UserItem