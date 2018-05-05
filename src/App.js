// @flow
import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import AsyncLoader from './components/AsyncLoader'
import styled from 'styled-components'

const Home = AsyncLoader(() => import('./pages/Home'))
const Admin = AsyncLoader(() => import('./pages/Admin'))

const Header = styled.header`
  background-color: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 0 4px rgba(0,0,0,.3);
`

const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #000;
  font-weight: bold;
  text-decoration: none;

  span {
    font-size: 1.5rem;
    margin-right: .5rem;
  }
`

class App extends Component<void> {
  render() {
    return (
      <div>
        <Header>
          <StyledLink to="/"><span>🍜</span> Friday Feast!</StyledLink>
          {/* <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/admin">Admin</Link></li>
            </ul>
          </nav> */}
        </Header>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/admin" component={Admin} />
        </main>
      </div>
    )
  }
}

export default App