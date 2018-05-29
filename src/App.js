// @flow
import React, { Component, Fragment } from 'react'
import { Route, Link } from 'react-router-dom'
import AsyncLoader from './components/AsyncLoader'
import { auth, isAuthenticated } from './fire'
import styled from 'styled-components'
import { Button } from './style/Button'
import PrivateRoute from './components/PrivateRoute'


const Home = AsyncLoader(() => import('./pages/Home'))
const Login = AsyncLoader(() => import('./components/Login'))
const Users = AsyncLoader(() => import('./components/Users'))

const Header = styled.header`
  position: relative;
  z-index: 2;
  background-color: #fff;
  padding: 1rem;
  box-shadow: 0 0 4px rgba(0,0,0,.3);
  display: flex;

  nav {
    margin-left: auto;
    margin-right: 1rem;
  }

  nav a {
    text-decoration: none;
    color: #FF5A5F;
  }
`

const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #000;
  font-weight: bold;
  text-decoration: none;
`

const Icon = styled.span`
  font-size: 1.5rem;
  margin-right: .5rem;
`

type State = {
  loading: boolean
}

class App extends Component<{}, State> {
  removeAuthListener: () => void

  constructor() {
    super()
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.removeAuthListener = auth.onAuthStateChanged(user => {
      this.setState({
        loading: false
      })
    })
  }

  componentWillUnmount() {
    this.removeAuthListener()
  }

  render() {
    return (
      <Fragment>
        <Header>
          <StyledLink to="/"><Icon>🍜</Icon> Friday Feast!</StyledLink>
          {isAuthenticated() &&
            <Fragment>
              <nav>
                <ul>
                  <li><Link to="/admin">Admin</Link></li>
                </ul>
              </nav>
              <Button type="button" onClick={() => auth.signOut()}>Sign out</Button>
            </Fragment>
          }
        </Header>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/admin" loading={this.state.loading} component={Users} />
        </main>
      </Fragment>
    )
  }
}

export default App