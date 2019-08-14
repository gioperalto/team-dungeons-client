import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Home'
import CreatePlayer from './CreatePlayer';

class AppRouter extends React.Component {
  render() {
      return (
        <Router>
          <div>
            <Route exact path='/' component={Home} />
            <Route path='/player/create' component={CreatePlayer} />
          </div>
        </Router>
      );
  }
}

export default AppRouter;