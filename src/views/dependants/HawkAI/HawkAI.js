// import { Typography } from "@mui/material";

// export const HawkAI = () => {
//   let content = (
//     <Typography>
//         HawkAI : Work in progress!
//     </Typography>
//   );
//   return content;
// };

// HawkAI.js
import { Component } from 'react';

import GoogleMapReact from 'google-map-react';

import styled from 'styled-components';

import AutoComplete from 'components/dependants/googlemap/Autocomplete';
import Marker from 'components/dependants/googlemap/Marker';
import 'css/Googlemap.css';

// const Wrapper = styled.main`
//     width: 100%;
//     height: 100%;
// `;

const Wrapper = styled.main((props) => ({
  width: props.width,
  height: props.height
}));

export class HawkAI extends Component {

    state = {
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      geoCoder: null,
      places: [],
      center: [],
      zoom: 9,
      address: '',
      draggable: true,
      lat: null,
      lng: null,
      clicked: false,
      lastClicked: true
    };

    UNSAFE_componentWillMount() {
      this.setCurrentLocation();
    }


    onMarkerInteraction = (_childKey, _childProps, mouse) => {
      this.setState({
        draggable: false,
        lat: mouse.lat,
        lng: mouse.lng
      });
    }
    onMarkerInteractionMouseUp = (_childKey, _childProps, _mouse) => {
      this.setState({ draggable: true });
      this._generateAddress();
    }

    _onChange = ({ center, zoom }) => {
      this.setState({
        center: center,
        zoom: zoom,
      });

    }

    _onClick = (value) => {
      this.setState({
        lat: value.lat,
        lng: value.lng,
        clicked: this.state.lastClicked ? true : false
      });
      this.setState({
        lastClicked: this.state.clicked
      });
    }

    apiHasLoaded = (map, maps) => {
      this.setState({
        mapApiLoaded: true,
        mapInstance: map,
        mapApi: maps,
      });

      this._generateAddress();
    };

    addPlace = (place) => {
      this.setState({
        places: [place],
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
      this._generateAddress();
    };

    _generateAddress() {
      const {
        mapApi
      } = this.state;

      const geocoder = new mapApi.Geocoder;

      geocoder.geocode({ 'location': { lat: this.state.lat, lng: this.state.lng } }, (results, status) => {
        console.log(results);
        console.log(status);
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12;
            this.setState({ address: results[0].formatted_address });
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }

      });
    }

    // Get Current Location Coordinates
    setCurrentLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.setState({
            center: [position.coords.latitude, position.coords.longitude],
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        });
      }
    }

    render() {
      const {
        places, mapApiLoaded, mapInstance, mapApi,
      } = this.state;

      let height = this.state.clicked ? "75%" : "100%";
      let width = this.state.clicked ? "75%" : "100%";

      return (
        
        <Wrapper height={height} width={width}>
          {mapApiLoaded && (
            <div>
              <AutoComplete map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />
            </div>
          )}
          <GoogleMapReact
            center={this.state.center}
            zoom={this.state.zoom}
            draggable={this.state.draggable}
            onChange={this._onChange}
            onChildMouseDown={this.onMarkerInteraction}
            onChildMouseUp={this.onMarkerInteractionMouseUp}
            onChildMouseMove={this.onMarkerInteraction}
            onChildClick={() => console.log('child click')}
            onClick={this._onClick}
            bootstrapURLKeys={{
              //   key: 'AIzaSyAM9uE4Sy2nWFfP-Ha6H8ZC6ghAMKJEKps',
              key: 'AIzaSyCMNZWdT1QMmnjf48z6bloyQFIUfTFfa5Q',
              libraries: ['places', 'geometry'],
            }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
          >

            <Marker
              text={this.state.address}
              lat={this.state.lat}
              lng={this.state.lng}
            />

          </GoogleMapReact>
          <div className="info-wrapper">
            <div className="map-details">Latitude: <span>{this.state.lat}</span>, Longitude: <span>{this.state.lng}</span></div>
            <div className="map-details">Zoom: <span>{this.state.zoom}</span></div>
            <div className="map-details">Address: <span>{this.state.address}</span></div>
          </div>


        </Wrapper >
      );
    }
}
