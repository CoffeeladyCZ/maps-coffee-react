import React, {MouseEventHandler, useEffect, useState} from 'react';
import { Marker} from '@react-google-maps/api';
import MapInfoWindow from '../MapInfoWindow/MapInfoWindow';
import { CurrentCafeType } from '../../contexts/MapsContext';

interface MarkerProps {
  infoVisible: boolean;
  data: CurrentCafeType;
  icon: string;
  position: {
    lat: number, lng: number
  };
  title: string;
  key: string;
  className: string;
  animation: google.maps.Animation | undefined;
  onClick: () => void;
  onCloseClick: () => void;
}

const MarkerComponent: React.FC<MarkerProps>  = (props) => {
  const [markerState, setMarkerState] = useState({
    infoVisible: props.infoVisible,
    zIndex: props.infoVisible ? 9999 : 1
  });

  const closeInfo = () => setMarkerState({
    infoVisible: false,
    zIndex: 1
  });

  const push = (up: number) => {
    const pushValue = up ? 1 : -1;
    setMarkerState({
      ...markerState,
      zIndex: markerState.zIndex + pushValue
    });
  };

  const {
    zIndex,
    infoVisible
  } = markerState;

  useEffect(() => {
    setMarkerState({
      ...markerState,
      infoVisible: props.infoVisible
    })
  }, [markerState, props.infoVisible])
  return (
    <Marker zIndex={zIndex} {...props} onMouseOver={() => push(1)} onMouseOut={() => push(-1)} >
      { infoVisible ? <MapInfoWindow toggleClose={closeInfo} {...props} /> : null }
    </Marker>
  )
}

export default MarkerComponent;
