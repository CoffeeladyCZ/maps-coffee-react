import { InfoWindow } from '@react-google-maps/api';
import React from 'react';
import './MapInfoWindow.scss'

const MapInfoWindow = (props, toggleClose) => {
  const { name, image, content, address, time } = props.data;
  return (
    <InfoWindow onCloseClick={toggleClose} {...props}>
      <div className='map-info-window'>
        <div>
          <h4 className='map-info-title'>{name}</h4>
          { !image ? null : <img src={image} alt='imagecoffee' />}  
          <p className='map-info-content'>{content}</p>
          <address className='map-info-address'>{address}<br />{time}</address>
        </div>
      </div>
    </InfoWindow>
  )
}

export default MapInfoWindow;
