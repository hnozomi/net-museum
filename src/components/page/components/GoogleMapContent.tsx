import { Box, Center, Text } from '@chakra-ui/react';
import { Circle, GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { FC } from 'react';

import { useGoogleMapPageHook } from '@/components/page/hooks/useGoogleMapPageHook';
import { MARKERS, POSITION } from '@/const';

const containerStyle = {
  height: '100vh',
  width: '100%',
};

const googleMapOptions = {
  center: POSITION.testCenter,
  maxZoom: 17,
  minZoom: 15,
};

const circleOptions = {
  clickable: false,
  draggable: false,
  editable: false,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  radius: 70,
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  visible: true,
  zIndex: 1,
};

export const GoogleMapContent: FC = () => {
  const {
    currentPosition,
    currentoPositionIndex,
    onClickInfoWindow,
    onLoad,
    onUnmount,
    setHomeCicle,
    setStationCicle,
    setSugiCicle,
  } = useGoogleMapPageHook();

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={googleMapOptions}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Circle
        center={POSITION.testStation}
        options={circleOptions}
        onLoad={(circle) => setStationCicle(circle)}
      />
      <Circle
        center={POSITION.testHome}
        options={circleOptions}
        onLoad={(circle) => setHomeCicle(circle)}
      />
      <Circle
        center={POSITION.testSugi}
        options={circleOptions}
        onLoad={(circle) => setSugiCicle(circle)}
      />
      <Marker position={currentPosition} />
      {MARKERS.map(({ id, name, position }) => (
        <InfoWindow key={id} position={position}>
          {currentoPositionIndex === id ? (
            <Box h="3rem" w="10rem" onClick={onClickInfoWindow}>
              <Center>
                <Text className="animation-test" fontSize="26px">
                  {name}
                </Text>
              </Center>
            </Box>
          ) : (
            <Box>
              <Text>{name}</Text>
            </Box>
          )}
        </InfoWindow>
      ))}
    </GoogleMap>
  );
};
