import React, { useState } from "react"; 
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import  MarkerComponent from '../Marker/AppMarker';

import coffeePin from '../../img/coffee-shop.png';

import './AppMap.scss';
import { listCoffeehouse } from "../../data/data";
import { useMarkerDistrictContext, useActualCoffeeHouseContext } from '../../contexts/MapsContext';

const Map = () => {
  const [currentWindowVisibleIndex, setCurrentWindowVisibleIndex] = useState(null);

  const district = useMarkerDistrictContext();
  const { coffeeHouse, setCoffeeHouse } = useActualCoffeeHouseContext();

  const onHideWindow = () => {
    setCurrentWindowVisibleIndex(null);
  }

  const showWindow = (index, name) => {
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
    }
  };

  const {
    center,
    zoom,
    secret,
    style
  } = settings;

  return (
    <div className="map">
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
                animation={i === currentWindowVisibleIndex || coffeehouse.name === coffeeHouse ? 1 : null}
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
