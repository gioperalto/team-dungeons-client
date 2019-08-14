import React from 'react'
import axios from 'axios';
import '../../css/App.css';

class CreatePlayer extends React.Component { 
  constructor () { 
    super()
    this.state = {
      stats: []
    }

    this.rollStats = this.rollStats.bind(this);
  }

  rollStats () {
    axios.get('http://localhost:5001/api/v5/players/rollStats')
      .then(response => this.setState({stats: response.data}));
  }

  createStats () {
    const stats = [];

    for(let i = 0; i < this.state.stats.length; i++) {
      stats.push(<div class='square'>{this.state.stats[i]}</div>);
    }

    return stats;
  }
  
  render () { 
    return (
      <div className="CreatePlayer">
        <div className='hero'>
          <h1 className='title'>Team Dungeons</h1>
          <p className='description'>
            To get started, roll your stats.
          </p>
          <button className='button' onClick={() => this.rollStats()}>
              Roll
          </button>

          <div className='dice'>
            {this.createStats()}
          </div>

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
    );
  }
}

export default CreatePlayer;
