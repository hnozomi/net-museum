import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';

export const GoogleMapPage = () => {
  const currentPosition = {
    lat: 34.709490414750995,
    lng: 135.52953335369796,
  };

  const currentPosition1 = {
    lat: 34.709490414750995,
    lng: -135.52953335369796,
  };

  const positionEki = {
    lat: 34.70890628770919,
    lng: 135.52586948808704,
  };

  const positionSugi = {
    lat: 34.70980148230848,
    lng: 135.52965140257464,
  };

  const positionDaimaru = {
    lat: 34.70193598874112,
    lng: 135.49661283110228,
  };

  useEffect(() => {
    const markerCenter = new window.google.maps.Marker({
      draggable: false,
      position: currentPosition,
      title: 'Location',
    });

    const test = new window.google.maps.Circle({
      center: positionDaimaru,
      radius: 70,
    });
    test.bindTo('center', markerCenter, 'position');
    const brounds = test.getBounds();
    console.log(brounds);
    console.log(brounds?.contains(currentPosition));
  }, []);
  return <Box>Googleマップのページです</Box>;
};
