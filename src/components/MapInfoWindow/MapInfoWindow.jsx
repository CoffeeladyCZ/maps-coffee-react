import { InfoWindow } from "@react-google-maps/api";
import React, { Component } from "react";
import './MapInfoWindow.scss'


class MapInfoWindow extends Component {
    render() {
        const {
            address,
            content,
            district,
            lat,
            lng,
            name,
            time,
            image
        } = this.props.data;
        return (
            <InfoWindow onCloseClick={this.props.toggleClose} {...this.props}>
                <div className="map-info-window">
                    <div>
                        <h4 className="map-info-title">{name}</h4>
                        { !image ? null : <img src={image} alt="imagecoffee" />}  
                        <h5 className="map-info-subtitle">{district}</h5>
                        <p className="map-info-content">{content}</p>
                        <address className="map-info-address">{address}<br />{time}</address>
                        <div className="map-info-other">
                            LNG: {lng}<br/>
                            LAT: {lat}
                        </div> 
                    </div>
                </div>
            </InfoWindow>
        )
    }
}


export default MapInfoWindow;