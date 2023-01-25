import { Box, Center, Text } from '@chakra-ui/react';
import {
  Circle,
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';

import { GoogleMapPage } from '@/components/GoogleMapPage';

const containerStyle = {
  height: '100vh',
  width: '100%',
};

const error = (err) => {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

const target = {
  latitude: 0,
  longitude: 0,
};

const options = {
  enableHighAccuracy: false,
  maximumAge: 0,
  timeout: 5000,
};

// navigator.geolocation &&
//   console.log(navigator.geolocation.watchPosition(success, error, options));
// const id = navigator.geolocation.watchPosition(success, error, options);

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

const markers = [
  {
    id: 1,
    name: '西洋絵画',
    position: { lat: 34.70890628770919, lng: 135.52586948808704 },
  },
  {
    id: 2,
    name: '東洋絵画',
    position: { lat: 34.70980148230848, lng: 135.52965140257464 },
  },
];

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
  const [activeMarker, setActiveMarker] = useState(null);
  const [circle, setCicle] = useState<google.maps.Circle | undefined>(
    undefined,
  );
  const [circle1, setCicle1] = useState<google.maps.Circle | undefined>(
    undefined,
  );

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const currentPosition1 = {
    lat: 34.709490414750995,
    lng: 135.52953335369796,
  };

  const test1 = circle?.getBounds();
  const test2 = circle1?.getBounds();
  console.log(test1?.contains(currentPosition1));
  console.log(test2?.contains(currentPosition1));
  console.log(circle1);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    id: 'google-map-script',
  });

  // useEffect(() => {
  //   navigator.geolocation.watchPosition(success, error, options);
  // }, []);

  // const success = (pos) => {
  //   const { latitude, longitude } = pos.coords;
  //   console.log(latitude, longitude);

  //   setLatitude(latitude);
  //   setLongitude(longitude);

  //   console.log('Congratulations, you reached the target', latitude, longitude);
  // };

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

  const currentPosition = {
    lat: 34.709490414750995,
    lng: 135.52953335369796,
  };
  // const polygon = new google.maps.Polygon(currentPosition);
  // google.maps.geometry.poly.containsLocation(
  //   { lat: 34.70980148230848, lng: 135.52965140257464 },
  //   polygon,
  // );

  useEffect(() => {
    // const markerCenter = new window.google.maps.Marker({
    //   draggable: false,
    //   map: map,
    //   position: currentPosition,
    //   title: 'Location',
    // });
    // const test = new window.google.maps.Circle({
    //   center: positionEki,
    //   radius: 70,
    // });
    // test.bindTo('center', markerCenter, 'position');
  }, []);

  const fetchArt = () => {
    alert('押しました');
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={OPTIONS}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Circle
        center={positionEki}
        options={circleOptions}
        onLoad={(circle) => setCicle(circle)}
      />
      <Circle
        center={positionSugi}
        options={circleOptions}
        onLoad={(circle) => setCicle1(circle)}
      />
      <Marker position={currentPosition} />
      <GoogleMapPage />
      {markers.map(({ id, name, position }) => (
        <InfoWindow key={id} position={position}>
          {activeMarker === id ? (
            <Box h="3rem" w="10rem" onClick={fetchArt}>
              <Center>
                <Text className="animation-test" fontSize="26px">
                  {name}
                </Text>
              </Center>
            </Box>
          ) : (
            <Box onClick={fetchArt}>
              <Text>{name}</Text>
            </Box>
          )}
        </InfoWindow>
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default MainPage;
