import React from "react";
import GoogleMapReact from "google-map-react";

import Marker from '../Marker/AppMarker';

import coffeePin from '../../img/coffee-shop.png';

import './AppMap.css';
import { listCoffeehouse } from "../../data/data";


class Map extends React.Component {
  settings = {
    center: { lat: 50.08033951568018, lng: 14.407263420492933 },
    zoom: 12,
  };

  render() {
    return (
        <div className="map">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyBmh8Jp0cdEFCQ2N5wsXy6Hu6xBOtm9lfU",
            }}
            defaultCenter={this.settings.center}
            defaultZoom={this.settings.zoom}
          >
          {
            listCoffeehouse.map(coffeehouse => 
              <Marker
                key={coffeehouse.name}
                lat={coffeehouse.lat}
                lng={coffeehouse.lng}
                icon={coffeePin}
            />
            )
          }
            
          </GoogleMapReact>
        </div>
    );
  }
}

export default Map;
