import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Menu from './js/components/Menu';
import Home from './js/components/Home';
import * as serviceWorker from './js/serviceWorker';

ReactDOM.render(<Menu />, document.getElementById('menu'));
ReactDOM.render(<Home />, document.getElementById('home'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
