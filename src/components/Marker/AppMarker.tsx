import React, {useEffect, useState} from 'react';
import { Marker} from '@react-google-maps/api';
import MapInfoWindow from '../MapInfoWindow/MapInfoWindow';

const MarkerComponent = (props) => {
  const [markerState, setMarkerState] = useState({
    infoVisible: props.infoVisible,
    zIndex: props.infoVisible ? 9999 : 1
  });

  const closeInfo = () => setMarkerState({
    infoVisible: false,
    zIndex: 1
  });

  const push = (up) => {
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
  }, [props.infoVisible])
  return (
    <Marker zIndex={zIndex} {...props} onMouseOver={() => push(true)} onMouseOut={() => push()} >
      { infoVisible ? <MapInfoWindow toggleClose={closeInfo} {...props} /> : null }
    </Marker>
  )
}

export default MarkerComponent;
