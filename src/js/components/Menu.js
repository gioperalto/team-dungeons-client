import React from 'react';
import logo from '../../static/icons/logo.png';

class Menu extends React.Component {
    render() {
        return (
          <nav className='black'>
            <a className='brand-logo center' href='/'>
              <img src={logo} alt='logo' height='64px' />
            </a>
            <ul id='nav-mobile' className='right hide-hide-on-med-and-down'>
              
              <li><a href="/index.html">Home</a></li>
              <li><a href="/products/product-1.html">Product</a></li>
              <li><a href="/contact.html">Contact</a></li>
            </ul>
          </nav>
        );
    }
}

export default Menu;