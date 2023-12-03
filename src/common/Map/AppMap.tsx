import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MarkerComponent from '../../components/Marker/AppMarker';

import coffeePin from '../../img/coffee-shop.png';

import './AppMap.scss';
import { RootState } from '../../store';
import { CafeDetailResponse } from '../../types/cafe';
import { setActualCafe } from '../../store/cafeDetail';

interface MapProps {
  height: string;
  detailCafe: boolean;
}

const Map: React.FC<MapProps> = ({ height, detailCafe }) => {
  const [currentWindowVisibleIndex, setCurrentWindowVisibleIndex] = useState<null | number>(null);

  const dispatch = useDispatch();

  const cafeDetail = useSelector((state: RootState) => state.cafeDetail.cafeDetail);


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
    secret: 'AIzaSyBmh8Jp0cdEFCQ2N5wsXy6Hu6xBOtm9lfU',
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
    <div className='map' style={{height: `${height}px`}}>
      <LoadScript
        googleMapsApiKey={secret}
      >
        <GoogleMap
          zoom={zoom}
          center={center}
          mapContainerStyle={style}
        >
          {
            detailCafe && cafeDetail && (
              <MarkerComponent
                className='coffee-marker'
                infoVisible={1 === currentWindowVisibleIndex}
                onClick={() => showWindow(1, cafeDetail)}
                onCloseClick={onHideWindow}
                data={cafeDetail}
                icon={coffeePin}
                animation={1 === currentWindowVisibleIndex || cafeDetail.name === cafeDetail.name ? 2 : undefined}
                position={{
                  lat: cafeDetail.coordinates.lat,
                  lng: cafeDetail.coordinates.lng
                }}
                key={cafeDetail.name}
                title={cafeDetail.name}
              />
            )
          }
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default Map;
