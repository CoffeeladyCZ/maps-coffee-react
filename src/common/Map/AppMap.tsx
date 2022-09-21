import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React, { useState } from "react";
import MarkerComponent from '../../components/Marker/AppMarker';

import coffeePin from '../../img/coffee-shop.png';

import { useActualCoffeeHouseContext, useMarkerDistrictContext } from '../../contexts/MapsContext';
import { listCoffeehouse } from "../../data/data";
import './AppMap.scss';

interface MapProps {
  height: string;
}

const Map: React.FC<MapProps> = ({ height }) => {
  const [currentWindowVisibleIndex, setCurrentWindowVisibleIndex] = useState<null | number>(null);

  const district = useMarkerDistrictContext();
  const { coffeeHouse, setCoffeeHouse } = useActualCoffeeHouseContext();

  const onHideWindow = () => {
    setCurrentWindowVisibleIndex(null);
  }

  const showWindow = (index: number, name: string) => {
    setCurrentWindowVisibleIndex(index);
    setCoffeeHouse(name);
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
            listCoffeehouse.filter(coffeehouse => coffeehouse.district.includes(district))
              .map((coffeehouse, i) => {
                return <MarkerComponent
                  className='coffee-marker'
                  infoVisible={i === currentWindowVisibleIndex}
                  onClick={() => showWindow(i, coffeehouse.name)}
                  onCloseClick={onHideWindow}
                  data={coffeehouse}
                  icon={coffeePin}
                  animation={i === currentWindowVisibleIndex || coffeehouse.name === coffeeHouse ? 2 : undefined}
                  position={{
                    lat: coffeehouse.lat,
                    lng: coffeehouse.lng
                  }}
                  key={coffeehouse.name}
                  title={coffeehouse.name}
                />
              })
          }
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default Map;
