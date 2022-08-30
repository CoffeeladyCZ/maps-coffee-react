import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faStar, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import './ModalContent.scss';

type PropsType = {
  name: string;
  address: string;
  time: string;
  content: string;
  image: string;
}

const ModalContent: React.FC  = (props<PropsType>) => {
  const starsCount: number = 5;
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const { name, address, time, content, image } = props;
  
  function getStars() {
    const stars: JSX.Element[] = [];
    for(let i=1; i<=starsCount; i++) {
      const larger = rating <= hovered ? hovered : rating;
      const isActive = i <= larger;
      stars.push(
        <FontAwesomeIcon 
          icon={faStar}
          key={i}
          size='lg'
          onMouseOver={() => setHovered(i)}
          className={isActive ? 'content-icon__active' : 'content-icon'} 
          onClick={() => setRating(i)} 
        />
      )
    }
    return stars;
  }

  return (
    <div className='content'>
      <div className="content-information">
        <h4 className='list-name'>{name}</h4>
        <p className='list-adress'>{address}</p>
        <p className='list-time'>{time}</p>
        <p className='content-ref'>t('rate'):</p>
        <div onMouseOut={() => setHovered(0)} className='content-star'>
          { getStars() }
        </div>       
        <table className='content-table'>
          <tbody>
            <tr>
              <td>t('modal:card')</td>
              <td><FontAwesomeIcon icon={faCircleCheck} size='lg' className='parameters-icon' /></td>
            </tr>
            <tr>
              <td>Work</td>
              <td><FontAwesomeIcon icon={faCircleXmark} size='lg' className='parameters-icon' /></td>
            </tr>
            <tr>
              <td>t("modal:beand"):</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='content-images'>
        { !image ? null : <img src={image} alt='imagecoffee' className='img' />}      
      </div>
    </div>
  )
}

export default ModalContent;
