import React from 'react';
import splash1 from '../../static/images/home-splash-1.jpg';
import splash2 from '../../static/images/home-splash-2.jpg';

class Home extends React.Component {
    render() {
        return (
            <div>
                <div class='parallax-hero overlay'>
                    <div class='section no-pad-bot'>
                        <div class='container'>
                            <h1 class='header center white-text'>Team Dungeons</h1> 
                        </div>
                        <div class='row center'>
                            <h5 class='header col s12 light white-text'>
                                Join friends and strangers on adventures that will test your luck, skill and determination.
                            </h5>
                        </div>
                        <div class='row center'>
                            <a href='/signup' class='btn-large deep-orange'>Create an account</a>
                        </div>
                    </div>
                    <div class='parallax'>
                        <img src={splash1} alt='Background Top' />
                    </div>
                </div>
                <div class='section white'>
                    <div class='row container'>
                        <div class='col s12 m4'>
                            <div class='icon-block'>
                                <h2 class='center'>
                                    <i class='material-icons'>open_with</i>
                                </h2>
                                <h5 class='center'>Real-Time</h5>
                                <p class='light center'>
                                    We built this with the capability to recreate the full experience of playing Dungeons & Dragons with your friends.  
                                </p>
                            </div>
                        </div>
                        <div class='col s12 m4'>
                            <div class='icon-block'>
                                <h2 class='center'>
                                    <i class='material-icons'>store</i> 
                                </h2>
                                <h5 class='center'>Freemium</h5>
                                <p class='light center'>
                                    It's free to play! We've also included a lot of cool features that our premium members can capitalize on.
                                </p>
                            </div>
                        </div>
                        <div class='col s12 m4'>
                            <div class='icon-block'>
                                <h2 class='center'>
                                    <i class='material-icons'>new_releases</i> 
                                </h2>
                                <h5 class='center'>Rapid Releases</h5>
                                <p class='light center'>
                                    New features are interwoven seamlessly and frequently. Our scalable architecture allows us to keep making the game better.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='parallax-container overlay'>
                    <div class='parallax'>
                        <img src={splash2} alt='Background Bottom' />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;