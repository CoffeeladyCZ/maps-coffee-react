import { InfoWindow } from '@react-google-maps/api';
import React from 'react';
import './MapInfoWindow.scss'
import { CafeDetailResponse } from '../../types/cafe';

interface MapInfoWindowProps {
  toggleClose: () => void;
  infoVisible: boolean;
  data: CafeDetailResponse;
  icon: string;
  position: {
    lat: number, lng: number
  };
  title: string;
  key: string;
  className: string;
  onClick: () => void;
}

const MapInfoWindow: React.FC<MapInfoWindowProps> = (props) => {
  const { name } = props.data;
  return (
    <InfoWindow onCloseClick={props.toggleClose} {...props}>
      <div>
        <p className='text-red-900 text-sm font-bold border-b border-red-900 px-2 my-2 uppercase'>{name}</p>
      </div>
    </InfoWindow>
  )
}

export default MapInfoWindow;
