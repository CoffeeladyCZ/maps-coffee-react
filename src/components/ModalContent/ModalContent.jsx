import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faStar } from '@fortawesome/free-solid-svg-icons'


import './ModalContent.scss';

const ModalContent = (props) => {
    return (
      <div className='content'>
        <h4 className='list-name'>{props.name}</h4>
        <p className='list-adress'>{props.address}</p>
        <p className='list-time'>{props.time}</p>
        <p className='content-ref'>Hodnocení:</p>
        <div className='content-star'>
          <FontAwesomeIcon icon={faStar} size='lg' className='content-icon' />
          <FontAwesomeIcon icon={faStar} size='lg' className='content-icon' />
          <FontAwesomeIcon icon={faStar} size='lg' className='content-icon' />
        </div>
        <div className='content-parameters'>
          <p>Věrnostní karta</p>
          <FontAwesomeIcon icon={faCircleCheck} size='lg' className='content-icon' />
        </div>

      
        { !props.image ? null : <img src={props.image} alt='imagecoffee' className='content-img' />}      </div>
  )
}

export default ModalContent;
