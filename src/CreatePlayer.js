import React from 'react'
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class CreatePlayer extends React.Component { 
  constructor () { 
    super()
    this.state = {
      stats: []
    }

    this.rollStats = this.rollStats.bind(this);
  }

  rollStats () {
    axios.get('http://localhost:6001/api/v5/players/rollStats')
      .then(response => this.setState({stats: response.data.stats}));
  }
  
  render () { 
    return (
      <div className="CreatePlayer">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

        </header>

        <div className='hero'>
          <h1 className='title'>Welcome to Next.js!</h1>
          <p className='description'>
            To get started, roll your stats.
          </p>
          <button className='button' onClick={() => this.rollStats()}>
              Roll
          </button>

          <p className='stats'>
            {this.state.stats}
          </p>

          {/* <div className='row'>
            <Link href='https://github.com/zeit/next.js#getting-started'>
              <a className='card'>
                <h3>Getting Started &rarr;</h3>
                <p>Learn more about Next.js on GitHub and in their examples</p>
              </a>
            </Link>
            <Link href='https://github.com/zeit/next.js/tree/master/examples'>
              <a className='card'>
                <h3>Examples &rarr;</h3>
                <p>Find other example boilerplates on the Next.js GitHub</p>
              </a>
            </Link>
            <Link href='https://github.com/zeit/next.js'>
              <a className='card'>
                <h3>Create Next App &rarr;</h3>
                <p>Was this tool helpful? Let us know how we can improve it!</p>
              </a>
            </Link>
          </div> */}
        </div>
      </div>
    )
  }
}

export default CreatePlayer
