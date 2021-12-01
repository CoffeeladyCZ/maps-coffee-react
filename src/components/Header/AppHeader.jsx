import React, { Component } from 'react';

import Navigation from '../Navigation/AppNavigation';

import './AppHeader.css';

import coffeeCup from './coffee-cup.png';

class Header extends Component {
 render() {
   return (
     <header>
      <h1>Mapa kaváren</h1>
      <p className="claim">... tady se jede jenom výběrovka</p>
      <img className="coffee-cup" src={coffeeCup} alt='' />
      <Navigation />
     </header>
   )
 }
}

export default Header;
