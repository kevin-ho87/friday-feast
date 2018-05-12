// @flow
import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../fire'

type Props = {
  component: React.ComponentType<any>,
  loading: boolean
}

const PrivateRoute = ({ component: Component, loading, ...rest }: Props) => {
  if (!loading) {
    return (<Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />)
  }
  return null
}

export default PrivateRoute
