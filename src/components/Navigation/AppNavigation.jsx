import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import { cityDistrict, cities } from '../../data/data';

import './AppNavigation.scss';

const CitySelect = () => {
  const selectBody = useRef(null);
  const [isOpened, setIsOpened] = useState(false)
  const [selectedCity, setSelectedCity] = 'All'
  const activeClass = isOpened ? ' active' : '';

  useEffect(() => {
    // component mounted
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keyup', handleClickOutside);

    return () => {
      // component unmounted
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keyup', handleClickOutside);
    };
  }, []);

  function handleClickOutside(event) {
    const target = event.target;
    const type = event.type.toLowerCase();
    const clickedOutside = type === 'click' && !target.matches('.navigation-menu-select, .navigation-menu-select *');
    const escapePressed = type === 'keyup' && event.key.toLowerCase() === 'escape';
    (clickedOutside || escapePressed) && setIsOpened(false);    
  }

  function toggle() {
    selectBody &&
      selectBody.current &&
      selectBody.current.style.setProperty(
        '--select-body-height',
        selectBody.current.scrollHeight + 'px'
      );
    setIsOpened(!isOpened);
  }
  return (
    <li onClick={toggle} className={`navigation-menu-select ${activeClass}`}>
      <div className='navigation-menu-select-wrapper' onClick={toggle}>
        Others
        <FontAwesomeIcon icon={faAngleDown} size='sm' className='navigation-menu-select-icon' />
      </div>
      <div ref={selectBody} className='navigation-menu-select-body city'>
        {cities.map((item, index) => {
          return (
            <div
              key={item.name}
              tabIndex={index}
              className={`navigation-menu-select-item${
                item.name === selectedCity ? 'active' : ''
              }`}
              onClick={() => setSelectedCity(item.name)}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </li>
  )
}
class Navigation extends React.Component {
  changeDistrict = (name) => {
    this.setState({
      district: name,
      active: this.state.active,
    },
    () => {
      this.props.callback(name)
    }
    )
  };

  changeCity = () => {
    this.setState({
      selectVisisble: true
    })
  }

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
          <CitySelect onClick={this.changeCity} />
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
