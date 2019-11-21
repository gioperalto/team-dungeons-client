import React from 'react'
import splash from '../../static/images/character-splash-1.jpg';
import axios from 'axios';

const races = require.context('../../static/images/races', true);
const classes = require.context('../../static/images/classes', true);
const characters = require.context('../../static/images/characters', true);

class CreatePlayer extends React.Component { 
  constructor () { 
    super()
    this.state = {
      rolls: [],
      race: { id: 'elf' },
      class: { name: 'barbarian' },
      stats: {
        str: '-', con: '-', dex: '-',
        int: '-', wis: '-', cha: '-'
      },
      races: [],
      classes: [],
    }

    this.rollStats = this.rollStats.bind(this);
    this.getRaces = this.getRaces.bind(this);
    this.getClasses = this.getClasses.bind(this);
  }

  onDragOver (ev) {
    ev.preventDefault();
  }

  onDragStart (ev, id) {
    ev.dataTransfer.setData("text/plain", id);
  }

  onDrop (ev, attr) {
    const id = ev.dataTransfer.getData("text");
    let stats = { ...this.state.stats, [attr]: this.state.rolls[id] };
    let newRolls = this.state.rolls;
    newRolls.splice(id,1);

    this.setState({stats});
    this.setState({ rolls: newRolls })

    if(this.state.rolls.length < 1) { 
      this.refs['tab1next'].className = 'btn-large deep-orange waves-effect waves-orange'; 
    }
  }

  rollStats () {
    axios.get('http://localhost:8080/api/v5/players/rollStats')
      .then(response => this.setState({ rolls: response.data }));
    // this.hide();
  }

  createdStats () {
    const data = [];

    for(let i = 0; i < this.state.rolls.length; i++) {
      data.push(
        <button key={i} 
          onDragStart={(e) => this.onDragStart(e, i)}
          draggable 
          className='btn deep-orange iso draggable'
        >
          {this.state.rolls[i]}
        </button>
      );
    }

    return data;
  }

  getRaces () {
    axios.get('http://localhost:8080/api/v5/races')
      .then(response => this.setState({ races: response.data }));
  }

  setRace (index) {
    this.setState({ race: this.state.races[index] });
  }

  displayRaces () {
    const data = [];

    for(let i = 0; i < this.state.races.length; i++) {
      const img_src = races(`./race-thumb-${this.state.races[i].id}.jpg`);
      const colors = {
        dwarf: 'purple',
        elf: 'green',
        halfling: 'blue',
        human: 'orange',
        dragonborn: 'red',
        gnome: 'indigo',
        half_elf: 'teal',
        half_orc: 'deep-purple',
        tiefling: 'amber'
      };
      const alignment = {
        lawfulness: {
          Lawful: 'blue',
          Neutral: 'indigo',
          Chaotic: 'purple'
        },
        goodness: {
          Good: 'green',
          Neutral: 'orange',
          Evil: 'red'
        }
      };

      data.push(
        <div className="col s4" key={i}>
          <div className="card hoverable">
            <div className="card-image">
              <img 
                src={img_src} 
                alt={this.state.races[i].id} 
              />
              <span className="card-title">{this.state.races[i].name}</span>
            </div>
            <div className="card-content">
              <div className='row'>
                <p>{`The ${this.state.races[i].name} can live for ${this.state.races[i].age.max} years and 
                  weighs ${this.state.races[i].size.min_weight}-${this.state.races[i].size.max_weight}
                  lbs. An adult ${this.state.races[i].name} may be ${this.state.races[i].size.max_height/12} feet tall.`}</p>
              </div>
              <div className='row'>
                <span className='light'>Languages:</span> {this.state.races[i].languages.map((cv) => {
                  return <span className='chip' key={cv}>{cv}</span>
                })}
              </div>
              <div className='row'>
                <span className='light'>Subraces:</span> {
                  this.state.races[i].subraces.map((cv) => {
                    return <span className={`chip ${colors[this.state.races[i].id]} white-text`} key={cv.name}>{cv.name}</span>
                  })
                }
              </div>
              <div className='row'>
                <span className='light'>Alignment:</span> 
                <span className={`chip ${alignment.lawfulness[this.state.races[i].alignment.lawfulness]} white-text`}>{this.state.races[i].alignment.lawfulness}</span>
                <span className={`chip ${alignment.goodness[this.state.races[i].alignment.goodness]} white-text`}>{this.state.races[i].alignment.goodness}</span>
              </div>
            </div>
            <div className="card-action">
              <button 
                className='btn deep-orange' 
                onClick={
                  () => {
                    this.setRace(i);
                    this.getClasses();
                    this.transitionTab('tab3');
                  }
                }>Select this race</button>
            </div>
          </div>
        </div>
      );
    }

    return data;
  }

  getClasses () {
    axios.get('http://localhost:8080/api/v5/classes')
      .then(response => this.setState({ classes: response.data }));
  }

  setClass (index) {
    this.setState({ class: this.state.classes[index] });
  }

  displayClasses () {
    const data = [];

    for(let i = 0; i < this.state.classes.length; i++) {
      const img_src = classes(`./class-thumb-${this.state.classes[i].name.toLowerCase()}.jpg`);
      data.push(
        <div key={i} className="col s12 m6 l4">
          <div className="card hoverable">
            <div className="card-image">
              <img 
                src={img_src} 
                alt={this.state.classes[i].name} 
              />
              <span className="card-title">{this.state.classes[i].name}</span>
            </div>
            <div className="card-content">
              <div className='row'>
                <div className='col s2'>
                  <span className="chip black white-text">d{this.state.classes[i].hit_die}</span>
                </div>
                <div className='col s10'>
                  <p className='light'>"{this.state.classes[i].description}"</p>
                </div>
              </div>
              <div className='row'>
                <div className='col s12'>
                  <div><span className='light'>Primary Abilities:</span> {this.state.classes[i].primary_abilities.map((cv) => {
                    return <div key={cv} className='chip blue white-text'>{cv}</div>
                  })}</div>
                </div>
                <div className='col s12'>
                  <div><span className='light'>Saving Throws:</span> {this.state.classes[i].saving_throws.map((cv) => {
                    return <div key={cv} className='chip orange white-text'>{cv}</div>
                  })}</div>
                </div>
              </div>
            </div>
            <div className="card-action">
              <button 
                className='btn deep-orange'
                onClick={
                  () => {
                    this.setClass(i);
                    this.transitionTab('tab4');
                  }
                }>Select this class</button>
            </div>
          </div>
        </div>
      );
    }

    return data;
  }

  displayCharacter () {
    let data = [];
    const img_src = characters(`./${this.state.race.id}-${this.state.class.name.toLowerCase()}.jpg`);

    data.push(
      <div className='center'>
        <div className='row'>
          <div className="col s12 m4">
            <h2 className="header">Character</h2>
            <div className="card">
              <div className="card-image">
                <img src={img_src} alt={`${this.state.race.id} ${this.state.class.name}`} />
              </div>
              <div class="card-content">
                <div className="row">
                  <div className="col s3">
                    <h5 className="header">Stats</h5>
                  </div>
                  <div className="col s9">
                    <div>
                      <span className="chip orange white-text">{`${this.state.stats.str} STR`}</span>
                      <span className="chip orange white-text">{`${this.state.stats.dex} DEX`}</span>
                      <span className="chip orange white-text">{`${this.state.stats.con} CON`}</span>
                    </div>
                    <div>
                      <span className="chip orange white-text">{`${this.state.stats.int} INT`}</span>
                      <span className="chip orange white-text">{`${this.state.stats.wis} WIS`}</span>
                      <span className="chip orange white-text">{`${this.state.stats.cha} CHA`}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col s3">
                    <h5 className="header">Info</h5>
                  </div>
                  <div className="col s9">
                    <span className="light">Name:</span><span className="chip">Boo Koo</span>
                    <span className="light">Age:</span><span className="chip">50 years</span>
                    <span className="light">Height:</span><span className="chip">50 in.</span>
                    <span className="light">Weight:</span><span className="chip">100 lbs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col s4'>
            <h2 className="header">Race</h2>
            <div className="card">
              <div className="card-image">
              </div>
              <div className="card-content">
                <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
              </div>
            </div>
          </div>
          <div className='col s4'>
            <h2 className="header">Class</h2>
            <div className="card">
              <div className="card-stacked">
                <div class="card-content">
                  <p>I am a very simple card. I am good at containing small bits of information.
                  I am convenient because I require little markup to use effectively.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        
    );

    return data;
  }

  disable (ref) {
    let ele = this.refs[ref];

    ele.className += ' disabled';
  }

  transitionText(ref1, ref2) {
    this.refs[ref1].className += ' hide';
    this.refs[ref2].className -= ' hide';
  }

  transitionTab (ref) {
    let ele = this.refs[ref];
    let afterLink = ele.children[0];
    
    ele.className = 'tab col s3';
    afterLink.click();
  }
  
  render () { 
    return (
      <div className="CreatePlayer">
        <div className='parallax-container overlay'>
          <div className='section no-pad-bot'>
            <div className='container'>
              <h1 className='header center white-text'>Character Creation</h1> 
            </div>
            <div className='row center'>
                <h5 className='header col s12 light white-text'>
                  Follow the steps below to create your character so that you can begin your journey.
                </h5>
            </div>
          </div>
          <div className='parallax'>
              <img src={splash} alt='Background Top' />
          </div>
        </div>
        <div className='section white'>
          <div className="row">
            <div className="col s12">
              <ul className="tabs">
                <li ref="tab1" className="tab col s3"><a className="active" href="#step1">Assign Stats</a></li>
                <li ref="tab2" className="tab col s3 disabled"><a href="#step2">Choose Race</a></li>
                <li ref="tab3" className="tab col s3 disabled"><a href="#step3">Choose Class</a></li>
                <li ref="tab4" className="tab col s3 disabled"><a href="#step4">Review Character</a></li>
              </ul>
            </div>
            <div id="step1">
              <div ref='tab1text1' className='center'>
                <h5 className='header col s12'>
                  Roll your dice to get started.
                </h5>
                <button
                  className='btn-large deep-orange waves-effect waves-orange' 
                  onClick={() => {
                      this.rollStats();
                      this.transitionText('tab1text1','tab1text2');
                  }}
                >
                  Roll
                </button>
              </div>
              <div ref='tab1text2' className='row hide'>
                <h5 className='header center'>
                  Move each number below into the stat of your choice.
                </h5>
              </div>
              <div className='row center'>
                {this.createdStats()}
              </div>
              <div className='row center'>
                <div className='col s2'>
                  <div className="card hoverable blue-grey darken-1 droppable" 
                    onDragOver={(e) => this.onDragOver(e)}
                    onDrop={(e) => this.onDrop(e, 'str')}
                  >
                    <div className="card-content white-text">
                      <span className="card-title">Strength </span>
                      <p>Measures your natural athleticism and bodily power.</p>
                    </div>
                    <div className="card-action white-text">
                      <i className='material-icons'>fitness_center</i> 
                      <p id='str'>{this.state.stats.str}</p>
                    </div>
                  </div>
                </div>
                <div className='col s2'>
                  <div className="card hoverable blue-grey darken-1 droppable" 
                    onDragOver={(e) => this.onDragOver(e)}
                    onDrop={(e) => this.onDrop(e, 'dex')}
                  >
                    <div className="card-content white-text">
                      <span className="card-title">Dexterity</span>
                      <p>Measures your physical agility and reflexes.</p>
                    </div>
                    <div className="card-action white-text">
                      <i className='material-icons'>flash_on</i> 
                      <p id='dex'>{this.state.stats.dex}</p>
                    </div>
                  </div>
                </div>
                <div className='col s2'>
                  <div className="card hoverable blue-grey darken-1 droppable" 
                    onDragOver={(e) => this.onDragOver(e)}
                    onDrop={(e) => this.onDrop(e, 'con')}
                  >
                    <div className="card-content white-text">
                      <span className="card-title">Constitution</span>
                      <p>Measures your health, stamina, and vital force.</p>
                    </div>
                    <div className="card-action white-text">
                      <i className='material-icons'>accessibility_new</i> 
                      <p id='con'>{this.state.stats.con}</p>
                    </div>
                  </div>
                </div>
                <div className='col s2'>
                  <div className="card hoverable blue-grey darken-1 droppable" 
                    onDragOver={(e) => this.onDragOver(e)}
                    onDrop={(e) => this.onDrop(e, 'int')}
                  >
                    <div className="card-content white-text">
                      <span className="card-title">Intelligence</span>
                      <p>Measures your information recall, and analytical skill.</p>
                    </div>
                    <div className="card-action white-text">
                      <i className='material-icons'>extension</i> 
                      <p id='int'>{this.state.stats.int}</p>
                    </div>
                  </div>
                </div>
                <div className='col s2'>
                  <div className="card hoverable blue-grey darken-1 droppable" 
                    onDragOver={(e) => this.onDragOver(e)}
                    onDrop={(e) => this.onDrop(e, 'wis')}
                  >
                    <div className="card-content white-text">
                      <span className="card-title">Wisdom</span>
                      <p>Measures your awareness, intuition, and insight.</p>
                    </div>
                    <div className="card-action white-text">
                      <i className='material-icons'>remove_red_eye</i> 
                      <p id='wis'>{this.state.stats.wis}</p>
                    </div>
                  </div>
                </div>
                <div className='col s2'>
                  <div className="card hoverable blue-grey darken-1 droppable" 
                    onDragOver={(e) => this.onDragOver(e)}
                    onDrop={(e) => this.onDrop(e, 'cha')}
                  >
                    <div className="card-content white-text">
                      <span className="card-title">Charisma</span>
                      <p>Measures your confidence and eloquence.</p>
                    </div>
                    <div className="card-action white-text">
                      <i className='material-icons'>favorite</i> 
                      <p id='cha'>{this.state.stats.cha}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='center'>
                <button 
                  ref='tab1next'
                  className='btn-large deep-orange waves-effect waves-orange hide' 
                  onClick={
                    () => {
                      this.getRaces();
                      this.disable('tab1');
                      this.transitionTab('tab2');
                    }
                  }>
                  Proceed
                </button>
              </div>
            </div>
            <div id="step2">
              <div className='row'>
                <h5 className='header center'>
                  Select your race.
                </h5>
              </div>
              <div className='row center'>
                {this.displayRaces()}
              </div>
            </div>
            <div id="step3">
              <div className='row center'>
                {this.displayClasses()}
              </div>
            </div>
            <div id="step4">
              {this.displayCharacter()}
            </div>
          </div>
        </div>
        <div className='parallax-container overlay'>
            <div className='parallax'>
                <img src={splash} alt='Background Bottom' />
            </div>
        </div>
      </div>
    );
  }
}

export default CreatePlayer;
