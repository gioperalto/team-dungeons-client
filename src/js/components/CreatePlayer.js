import React from 'react'
import splash from '../../static/images/character-splash-1.jpg';
import axios from 'axios';

class CreatePlayer extends React.Component { 
  constructor () { 
    super()
    this.state = {
      visibility: {},
      stats: []
    }

    this.rollStats = this.rollStats.bind(this);
  }

  // hide() {
  //     this.setState({ visibility: { display: 'none' } });
  // }

  rollStats () {
    axios.get('http://localhost:5001/api/v5/players/rollStats')
      .then(response => this.setState({stats: response.data}));
    // this.hide();
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
              <h1 class='header center white-text'>Character Creation</h1> 
            </div>
            <div class='row center'>
                <h5 class='header col s12 light white-text'>
                  Follow the steps below to create your character so that you can begin your journey.
                </h5>
            </div>
          </div>
          <div class='parallax'>
              <img src={splash} alt='Background Top' />
          </div>
        </div>
        <div class='section white'>
          <div class="row">
            <div class="col s12">
              <ul class="tabs">
                <li class="tab col s3"><a class="active" href="#step1">Roll</a></li>
                <li class="tab col s3 disabled"><a href="#step2">Assign Stats</a></li>
                <li class="tab col s3 disabled"><a href="#step3">Choose Race</a></li>
                <li class="tab col s3 disabled"><a href="#step4">Choose Class</a></li>
              </ul>
            </div>
            <div id="step1" class="col s12">
              <div class='row center'>
                <h5 class='header col s12'>
                  Roll your dice to get started.
                </h5>
              </div>
              <div class='row center'>
                <button class='btn-large deep-orange waves-effect waves-orange' onClick={() => this.rollStats()}>
                  Roll
                </button>
              </div>
            </div>
            <div id="step2" class="col s12">
              <div class='row center'>
                {this.createdStats()}
              </div>
            </div>
            <div id="step3" class="col s12">step 3</div>
            <div id="step4" class="col s12">step 4</div>
          </div>
        </div>
        <div class='parallax-container overlay'>
            <div class='parallax'>
                <img src={splash} alt='Background Bottom' />
            </div>
        </div>
      </div>
    );
  }
}

export default CreatePlayer;
