import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function TestMap({ lanLng }){
  const defaultProps = {
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBi2i-2SZn6ZOOW7mPnDH2pvV-AOoWu7eA" }}
        center={lanLng}
        zoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={lanLng.lat}
          lng={lanLng.lng}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}
