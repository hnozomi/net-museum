import { Box, Center, Text } from '@chakra-ui/react';
import {
  CircleF,
  GoogleMap,
  InfoWindowF,
  LoadScriptNext,
  MarkerF,
} from '@react-google-maps/api';
import { FC } from 'react';

import { GoogleMapPageProps } from '@/components/page/googleMap/hooks/useGoogleMapPageHook';
import { MARKERS, POSITIONS, TESTCENTER } from '@/const';

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

export const GoogleMapContent: FC<GoogleMapPageProps> = ({
  circleOnLoad,
  currentPosition,
  currentPositionIndex,
  onClickInfoWindow,
  onLoad,
  onUnmount,
}) => {
  const containerStyle = {
    height: '100vh',
    width: '100%',
  };

  const googleMapOptions = {
    center: TESTCENTER,
    clickableIcons: false,
    maxZoom: 17,
    minZoom: 15,
  };

  return (
    <LoadScriptNext
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={googleMapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {POSITIONS.map(({ id, position }) => (
          <CircleF
            center={position}
            key={id}
            options={circleOptions}
            onLoad={(circle) => circleOnLoad(circle, id)}
          />
        ))}
        <MarkerF position={currentPosition} />
        {MARKERS.map(({ id, name, position }) => (
          <InfoWindowF key={id} position={position}>
            {currentPositionIndex === id ? (
              <Box h="3rem" w="10rem" onClick={onClickInfoWindow}>
                <Center>
                  <Text className="animation-test" fontSize="26px">
                    {name}
                  </Text>
                </Center>
              </Box>
            ) : (
              <Box onClick={onClickInfoWindow}>
                <Text>{name}</Text>
              </Box>
            )}
          </InfoWindowF>
        ))}
      </GoogleMap>
    </LoadScriptNext>
  );
};