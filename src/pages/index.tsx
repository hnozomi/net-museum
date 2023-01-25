import { Box, Heading } from '@chakra-ui/react';
import {
  Circle,
  GoogleMap,
  InfoWindow,
  useJsApiLoader,
} from '@react-google-maps/api';
import type { NextPage } from 'next';
import { useCallback, useState } from 'react';

const containerStyle = {
  height: '100vh',
  width: '100%',
};

//梅田用

const center = {
  lat: 34.70328550537374,
  lng: 135.49771790112666,
};

const positionYodobashi = {
  lat: 34.704186205313,
  lng: 135.49637874961,
};

const positionDaimaru = {
  lat: 34.70193598874112,
  lng: 135.49661283110228,
};

// テスト用

const center1 = {
  lat: 34.70856452367314,
  lng: 135.53041046785634,
};

const positionEki = {
  lat: 34.70890628770919,
  lng: 135.52586948808704,
};

const positionSugi = {
  lat: 34.70980148230848,
  lng: 135.52965140257464,
};

const circleOptions = {
  clickable: false,
  draggable: false,
  editable: true,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  radius: 70,
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  visible: true,
  zIndex: 1,
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

  const OPTIONS = {
    center: center1,
    maxZoom: 17,
    minZoom: 17,
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={OPTIONS}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Circle center={positionEki} options={circleOptions} />
      <Circle center={positionSugi} options={circleOptions} />
      <InfoWindow position={positionEki}>
        <Box>
          <Heading as="h4" size="md">
            駅
          </Heading>
        </Box>
      </InfoWindow>
      <InfoWindow position={positionSugi}>
        <Box>
          <Heading as="h4" size="md">
            薬局
          </Heading>
        </Box>
      </InfoWindow>
      {/* <Circle center={positionDaimaru} options={circleOptions} />
      <Circle center={positionYodobashi} options={circleOptions} />
      <InfoWindow position={positionYodobashi}>
        <Box>
          <Heading as="h4" size="md">
            西洋絵画
          </Heading>
        </Box>
      </InfoWindow>
      <InfoWindow position={positionDaimaru}>
        <Box>
          <Heading as="h4" size="md">
            アジア
          </Heading>
        </Box>
      </InfoWindow> */}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default MainPage;
