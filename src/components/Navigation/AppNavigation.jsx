import React, { Component } from 'react';

import './AppNavigation.css';

const cityDistrict = [
  'All', 'Letná', 'Karlín', 'Dejvice', 'Vinohrady',
  'Nusle', 'Centrum'
];

class Navigation extends Component {

  render() {
  const list = cityDistrict.map(item => <li className="li" key={item}>{item}</li>)

    return (
      <div className="navigation">
        {/* <input className="menu-btn" type="checkbox" id="menu-btn"></input>
        <label className="menu-icon"><span className="nav-icon"></span></label>
       */}
        <ul className="navigation-menu">
          {list}
        </ul>
      </div>
    )
  }
}

export default Navigation;
