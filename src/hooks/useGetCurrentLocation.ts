import { useState } from 'react';

export const useGetCurrentLocation = () => {
  const [currentPosition, setCurrentPosition] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral
  >({ lat: 0, lng: 0 });

  navigator.geolocation.watchPosition((position) => {
    const { latitude, longitude } = position.coords;
    setCurrentPosition({ lat: latitude, lng: longitude });
  });

  return { currentPosition };
};
