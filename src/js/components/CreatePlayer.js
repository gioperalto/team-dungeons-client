import React from 'react'
import bg1 from '../../static/images/home.jpg';
import axios from 'axios';
import '../../css/App.css';

class CreatePlayer extends React.Component { 
  constructor () { 
    super()
    this.state = {
      visibility: {},
      stats: []
    }

    this.rollStats = this.rollStats.bind(this);
  }

  hide() {
      this.setState({ visibility: { display: 'none' } });
  }

  rollStats () {
    axios.get('http://localhost:5001/api/v5/players/rollStats')
      .then(response => this.setState({stats: response.data}));
    this.hide();
  }

  createdStats () {
    const stats = [];

    // stats.push(<div class='col s12'><h5 class='header'>Here are the results of your roll:</h5></div>);

    // stats.push(<div class='col s3'></div>);
    for(let i = 0; i < this.state.stats.length; i++) {
      stats.push(<div class='col s1'><h5 class='header'>{this.state.stats[i]}</h5></div>);
    }
    // stats.push(<div class='col s3'></div>);

    return stats;
  }
  
  render () { 
    return (
      <div class="CreatePlayer">
        <div class='parallax-container overlay'>
          <div class='section no-pad-bot'>
            <div class='container'>
              <h1 class='header center white-text'>Team Dungeons</h1> 
            </div>
            <div id='step1' style={this.state.visibility} >
              <div class='row center'>
                <h5 class='header col s12 white-text'>
                  Roll your dice to get started.
                </h5>
              </div>
              <div class='row center'>
                <button class='btn-large deep-orange' onClick={() => this.rollStats()}>
                  Roll
                </button>
              </div>
            </div>
            <div id='step2'>
              <div class='row center white'>
                {this.createdStats()}
              </div>
            </div>
          </div>
          <div class='parallax'>
              <img src={bg1} alt='Background Top' />
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePlayer;
