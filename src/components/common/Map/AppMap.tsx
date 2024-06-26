import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MarkerComponent from '../../Marker/AppMarker';

import coffeePin from '../../../img/newPin.svg';

import { RootState } from '../../../store';
import { CafeDetailResponse } from '../../../types/cafe';
import { setActualCafe } from '../../../store/cafeDetail';

interface MapProps {
  height: string;
  detailCafe: boolean;
}

const Map: React.FC<MapProps> = ({ height }) => {
  const [currentWindowVisibleIndex, setCurrentWindowVisibleIndex] = useState<null | number>(null);

  const dispatch = useDispatch();

  const cafeList = useSelector((state: RootState) => state.cafeList.cafeList);

  const onHideWindow = () => {
    setCurrentWindowVisibleIndex(null);
  }

  const showWindow = (index: number, item: CafeDetailResponse) => {
    setCurrentWindowVisibleIndex(index);
    dispatch(setActualCafe(item));
  }


  const settings = {
    center: { lat: 50.08033951568018, lng: 14.407263420492933 },
    zoom: 12,
    secret: import.meta.env.VITE_APP_MAP_KEY,
    style: {
      width: '100%',
      height: '100%'
    },
  };

  const {
    center,
    zoom,
    secret,
    style,
  } = settings;

  return (
    <div className='w-full my-12' style={{height: `${height}px`}}>
      <LoadScript
        googleMapsApiKey={secret}
      >
        <GoogleMap
          zoom={zoom}
          center={center}
          mapContainerStyle={style}
        >
          {
            cafeList && cafeList.map((item) => {
              return (
                <MarkerComponent
                  infoVisible={1 === currentWindowVisibleIndex}
                  onClick={() => showWindow(1, item)}
                  onCloseClick={onHideWindow}
                  data={item}
                  icon={coffeePin}
                  position={{
                    lat: item.coordinates.lat,
                    lng: item.coordinates.lng
                  }}
                  key={item.name}
                  title={item.name}
                />
              )})
          }
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default Map;
