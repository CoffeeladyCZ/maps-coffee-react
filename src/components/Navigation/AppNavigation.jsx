import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { cityDistrict } from '../../data/data';

import './AppNavigation.scss';


class Navigation extends React.Component {
  
  changeDistrict = (name) => {
    this.setState({
      district: name,
      active: this.state.active
    },
    () => {
      this.props.callback(name)
    }
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      district: 'All',
      active: true,
  };
  }
  
  render() {
    return (
      <div className='navigation'>
        <ul className='navigation-menu'>
          {
            cityDistrict.map((item) => 
              <li 
                className={this.state.active && item.name === this.state.district ? 'active' : ''} 
                key={item.name} 
                onClick={() => this.changeDistrict(item.name)}>
                {item.name}
              </li>
            )
          }
          <Link to="form" className='navigation-menu__icon'>
            <FontAwesomeIcon icon={faPlus} size="lg"/>
              <span className='navigation-menu__icon-text'>New</span>
          </Link>
        </ul>
      </div>
    );
  }
}

export default Navigation;
