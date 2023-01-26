import { Box, Center, Text } from '@chakra-ui/react';
import { Circle, GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { FC } from 'react';

import { useGoogleMapPageHook } from '@/components/page/hooks/useGoogleMapPageHook';
import { MARKERS, POSITIONS, TESTCENTER } from '@/const';

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
    circleOnLoad,
    currentPosition,
    currentoPositionIndex,
    isCurrentPosition,
    onClickInfoWindow,
    onLoad,
    onUnmount,
  } = useGoogleMapPageHook();

  return isCurrentPosition ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={googleMapOptions}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {POSITIONS.map(({ id, position }) => (
        <Circle
          center={position}
          key={id}
          options={circleOptions}
          onLoad={(circle) => circleOnLoad(circle, id)}
        />
      ))}
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
  ) : (
    <Box>
      <Center mt="5rem">
        <Text>あなたの端末では、現在位置を取得できません。</Text>
        <Text>位置情報機能をONにしてください</Text>
      </Center>
    </Box>
  );
};
