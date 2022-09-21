import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faStar, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import './ModalContent.scss';

function ModalContent ({ name, address, time, content, image }) {
  const starsCount = 5;
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);

  function getStars() {
    const stars = [];
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
        <p className='content-ref'>Hodnocení:</p>
        <div onMouseOut={() => setHovered(0)} className='content-star'>
          {
            getStars()
          }
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
        { !image ? null : <img src={image} alt='imagecoffee' className='img' />}
      </div>
    </div>
  )
}

export default ModalContent;
