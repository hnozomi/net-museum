import { useSafeLayoutEffect } from '@chakra-ui/react';
import { useCallback, useState } from 'react';

import { POSITION } from '@/const';

export const useGoogleMapPageHook = () => {
  const [currentPosition, setCurrentPosition] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral
  >({ lat: 0, lng: 0 });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentoPositionIndex, setCurrentoPositionIndex] = useState(0);

  const [stationCircle, setStationCicle] = useState<
    google.maps.Circle | undefined
  >(undefined);
  const [sugiCircle, setSugiCicle] = useState<google.maps.Circle | undefined>(
    undefined,
  );
  const [homeCircle, setHomeCicle] = useState<google.maps.Circle | undefined>(
    undefined,
  );

  const currentPositionCheck = (
    currentPosition: google.maps.LatLng | google.maps.LatLngLiteral,
  ) => {
    const stationCircleContain = stationCircle?.getBounds();
    const sugiCircleContain = sugiCircle?.getBounds();
    const homeCircleContain = homeCircle?.getBounds();

    if (stationCircleContain?.contains(currentPosition)) return 1;
    if (sugiCircleContain?.contains(currentPosition)) return 2;
    if (homeCircleContain?.contains(currentPosition)) return 3;
    return 0;
  };

  // 必須らしい
  const onLoad = useCallback((map: google.maps.Map) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(POSITION.testCenter);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useSafeLayoutEffect(() => {
    navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
    });
    const result = currentPositionCheck(currentPosition);
    alert(result);
    setCurrentoPositionIndex(result);
  }, [navigator]);

  const onClickInfoWindow = (data) => {
    alert(data);
  };

  return {
    currentPosition,
    currentoPositionIndex,
    onClickInfoWindow,
    onLoad,
    onUnmount,
    setHomeCicle,
    setStationCicle,
    setSugiCicle,
  };
};

export type GoogleMapPageProps = ReturnType<typeof useGoogleMapPageHook>;
