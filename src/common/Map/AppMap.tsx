import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React, { useState } from 'react';

import MarkerComponent from '../../components/Marker/AppMarker';

import coffeePin from '../../img/coffee-shop.png';

import { useCurrentCafeContext, useMarkerDistrictContext, useListCafesContext, CurrentCafeType } from '../../contexts/MapsContext';
import './AppMap.scss';

interface MapProps {
  height: string;
  detailCafe: boolean;
}

const Map: React.FC<MapProps> = ({ height, detailCafe }) => {
  const [currentWindowVisibleIndex, setCurrentWindowVisibleIndex] = useState<null | number>(null);

  const location = useMarkerDistrictContext();
  const { currentCafe, setCurrentCafe } = useCurrentCafeContext();
  const { listCafes } = useListCafesContext();

  const onHideWindow = () => {
    setCurrentWindowVisibleIndex(null);
  }

  const showWindow = (index: number, item: CurrentCafeType) => {
    setCurrentWindowVisibleIndex(index);
    setCurrentCafe(item);
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

  const cafes = listCafes

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
            detailCafe && (
              <MarkerComponent
                className='coffee-marker'
                infoVisible={1 === currentWindowVisibleIndex}
                onClick={() => showWindow(1, currentCafe)}
                onCloseClick={onHideWindow}
                data={currentCafe}
                icon={coffeePin}
                animation={1 === currentWindowVisibleIndex || currentCafe.name === currentCafe.name ? 2 : undefined}
                position={{
                  lat: currentCafe.lat,
                  lng: currentCafe.lng
                }}
                key={currentCafe.name}
                title={currentCafe.name}
              />
            )
          }
          {
            !detailCafe && cafes &&
                cafes.filter(cafe => cafe.location.includes(location))
                  .map((cafe, i) => {
                    return (
                      <MarkerComponent
                        className='coffee-marker'
                        infoVisible={i === currentWindowVisibleIndex}
                        onClick={() => showWindow(i, cafe)}
                        onCloseClick={onHideWindow}
                        data={cafe}
                        icon={coffeePin}
                        animation={i === currentWindowVisibleIndex || cafe.name === currentCafe.name ? 2 : undefined}
                        position={{
                          lat: cafe.lat,
                          lng: cafe.lng
                        }}
                        key={cafe.name}
                        title={cafe.name}
                      />
                    )
                  })
          }
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default Map;
