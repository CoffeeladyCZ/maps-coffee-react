import React from "react";
import GoogleMapReact from "google-map-react";

// import data from "../../data";

class Map extends React.Component {
  settings = {
    center: { lat: 50.08033951568018, lng: 14.407263420492933 },
  };

  // initMap() {
  //   const center = { lat: 50.08033951568018, lng: 14.407263420492933 };
  //   window.map = new google.maps.Map(document.getElementById("map"), {
  //     center: center,
  //     zoom: 12,
  //   });
  // }
  render() {
    return (
      <section className="App-map">
        <div className="map">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyBmh8Jp0cdEFCQ2N5wsXy6Hu6xBOtm9lfU",
            }}
            defaultCenter={this.settings.center}
            defaultZoom={12}
          >
          </GoogleMapReact>
        </div>
        <div className="list-coffeehouse"></div>
      </section>
    );
  }
}

export default Map;
