import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faStar, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import './ModalContent.scss';

function ModalContent (props) {
  const [isActive, setActive] = useState(false);

  function isActiveIcon() {
    setActive((setActive) => !setActive);
    if (isActive) localStorage.setItem('isActive', 'true');
    if (!isActive) localStorage.setItem('isActive', 'false');
  }

  useEffect(() => {
    const setIcon = localStorage.getItem('isActive');
    console.log('setIcon', setIcon)
    setActive(setIcon);
  }, [])

  return (
    <div className='content'>
      <div className="content-information">
        <h4 className='list-name'>{props.name}</h4>
        <p className='list-adress'>{props.address}</p>
        <p className='list-time'>{props.time}</p>
        <p className='content-ref'>Hodnocení:</p>
        <div className='content-star'>
          <FontAwesomeIcon 
            icon={faStar} 
            size='lg'  
            className={isActive ? 'content-icon__active' : 'content-icon'} 
            onClick={isActiveIcon} 
          />
          <FontAwesomeIcon 
            icon={faStar} 
            size='lg' 
            className={isActive ? 'content-icon__active' : 'content-icon'} 
            onClick={isActiveIcon} 
          />
          <FontAwesomeIcon
            icon={faStar} 
            size='lg' 
            className={isActive ? 'content-icon__active' : 'content-icon'} 
            onClick={isActiveIcon} 
          />
        </div>       
        <table className='content-table'>
          <tbody>
            <tr>
              <td>Věrnostní karta</td>
              <td><FontAwesomeIcon icon={faCircleCheck} size='lg' className='parameters-icon' /></td>
            </tr>
            <tr>
              <td>Work</td>
              <td><FontAwesomeIcon icon={faCircleXmark} size='lg' className='parameters-icon' /></td>
            </tr>
            <tr>
              <td>Zrnka na mlýnku:</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='content-images'>
        { !props.image ? null : <img src={props.image} alt='imagecoffee' className='img' />}      
      </div>
    </div>
  )
}

export default ModalContent;
