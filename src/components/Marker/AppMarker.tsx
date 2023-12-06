import React, {useEffect, useState} from 'react';
import { Marker} from '@react-google-maps/api';
import { useSelector } from 'react-redux';

import MapInfoWindow from '../MapInfoWindow/MapInfoWindow';
import { CafeDetailResponse } from '../../types/cafe';
import { RootState } from '../../store';

interface MarkerProps {
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
  onCloseClick: () => void;
}

const MarkerComponent: React.FC<MarkerProps>  = (props) => {
  const [markerState, setMarkerState] = useState({
    infoVisible: props.infoVisible,
    zIndex: props.infoVisible ? 9999 : 1
  });

  const actualCafe = useSelector((state: RootState) => state.cafeDetail.actualCafe);

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
  }, [setMarkerState, props.infoVisible])
  return (
    <Marker zIndex={zIndex} {...props} onMouseOver={() => push(1)} onMouseOut={() => push(-1)} >
      { infoVisible && actualCafe && actualCafe.name === props.data.name ? <MapInfoWindow toggleClose={closeInfo} {...props} /> : null }
    </Marker>
  )
}

export default MarkerComponent;
