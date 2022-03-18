import React, { Component } from 'react';

import './AppHeader.scss';

import coffeeCup from './coffee-cup.png';

class Header extends Component {
 render() {
   return (
    <header className='app-header'>
      <h1>Mapa kaváren</h1>
      <p className='claim'>... tady se jede jenom výběrovka</p>
      <img className='coffee-cup' src={coffeeCup} alt='coffee cup' />
    </header>
   )
 }
}

export default Header;
