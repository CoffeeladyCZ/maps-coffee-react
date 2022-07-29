import { InfoWindow } from '@react-google-maps/api';
import React from 'react';
import { CurrentCafeType } from '../../contexts/MapsContext';
import './MapInfoWindow.scss'

// type ToggleCloseType = {
//   zIndex: number;
//   infoVisible: boolean;
// }

interface MapInfoWindowProps {
  toggleClose: () => void;
  infoVisible: boolean;
  data: CurrentCafeType;
  icon: string;
  animation: google.maps.Animation | undefined;
  position: {
    lat: number, lng: number
  };
  title: string;
  key: string;
  className: string;
  onClick: () => void;
}

const MapInfoWindow: React.FC<MapInfoWindowProps> = (props) => {
  const { name, content, address, time } = props.data;
  return (
    <InfoWindow onCloseClick={props.toggleClose} {...props}>
      <div className='map-info-window'>
        <div>
          <h4 className='map-info-title'>{name}</h4>
          <p className='map-info-content'>{content}</p>
          <address className='map-info-address'>{address}<br />{time}</address>
        </div>
      </div>
    </InfoWindow>
  )
}

export default MapInfoWindow;
