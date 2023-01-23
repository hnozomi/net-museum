import { GoogleMap, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import type { NextPage } from 'next';
import { useCallback, useState } from 'react';

const containerStyle = {
  height: '100vh',
  width: '100%',
};

const center = {
  lat: 34.7055051,
  lng: 135.4983028,
};

const positionYodobashi = {
  lat: 34.704186205313,
  lng: 135.49637874961,
};

const markerLabelYodobashi = {
  color: 'white',
  fontFamily: 'sans-serif',
  fontSize: '15px',
  fontWeight: '100',
  text: '西洋絵画',
};

const divStyle = {
  background: 'white',
  fontSize: 7.5,
  height: '300px',
  width: '300px',
};

const MainPage: NextPage = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    id: 'google-map-script',
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      center={center}
      mapContainerStyle={containerStyle}
      zoom={17}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* <Marker label={markerLabelYodobashi} position={positionYodobashi} /> */}
      <InfoWindow position={positionYodobashi}>
        <div style={divStyle}>
          <h1>秋葉原オフィスaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h1>
        </div>
      </InfoWindow>
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default MainPage;
