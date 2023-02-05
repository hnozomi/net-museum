import { Box, Button } from '@chakra-ui/react';
import {
  CircleF,
  GoogleMap,
  InfoWindowF,
  LoadScriptNext,
  MarkerF,
} from '@react-google-maps/api';
import { FC } from 'react';

import { GoogleMapPageProps } from '@/components/page/googleMap/hooks/useGoogleMapPageHook';
import { MARKERS } from '@/const/markers';
import { POSITIONS } from '@/const/position';

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
  zoom,
}) => {
  const containerStyle = {
    height: '95vh',
    width: '100%',
  };

  const googleMapOptions = {
    // center: currentPosition,
    clickableIcons: false,
    gestureHandling: 'greedy',
    // maxZoom: 25,
    // minZoom: 4,
  };

  return (
    <LoadScriptNext
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={googleMapOptions}
        zoom={zoom}
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
        <MarkerF
          icon="/walking-icon.png"
          position={currentPosition}
          zIndex={9}
        />
        {MARKERS.map(({ id, name, position }) => (
          <InfoWindowF key={id} position={position}>
            {currentPositionIndex === id ? (
              <Button
                className="animation-test"
                fontSize="26px"
                onClick={() => onClickInfoWindow(currentPositionIndex)}
              >
                {name}
              </Button>
            ) : (
              <Box bgColor="white" fontSize="1rem">
                {name}
              </Box>
            )}
          </InfoWindowF>
        ))}
      </GoogleMap>
    </LoadScriptNext>
  );
};
