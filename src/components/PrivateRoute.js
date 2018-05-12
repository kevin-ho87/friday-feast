// TODO - add flowtype
import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../fire'

const PrivateRoute = ({ component: Component, loading, ...rest }) => {
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
