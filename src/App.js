// @flow
import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import AsyncLoader from './components/AsyncLoader'

const Home = AsyncLoader(() => import('./pages/Home'))
const About = AsyncLoader(() => import('./pages/About'))


class App extends Component<void> {
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </main>
      </div>
    )
  }
}

export default App