import { useCallback, useRef, useState } from 'react';

import { TESTCENTER } from '@/const';

export const useGoogleMapPageHook = () => {
  const [currentPosition, setCurrentPosition] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral
  >({ lat: 0, lng: 0 });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentoPositionIndex, setCurrentoPositionIndex] = useState(0);
  const [isCurrentPosition, setIsCurrentPositionCheck] = useState(true);

  const [circleArray, setCircleArray] = useState<
    { circle: google.maps.Circle; id: number }[]
  >([]);

  const mapRef = useRef<google.maps.Map>();

  const currentPositionCheck = (
    currentPosition: google.maps.LatLng | google.maps.LatLngLiteral,
  ) => {
    for (const position of circleArray) {
      const circle = position.circle.getBounds();
      if (circle?.contains(currentPosition)) {
        setCurrentoPositionIndex(position.id);
        return;
      } else {
        setCurrentoPositionIndex(0);
      }
    }
  };

  const circleOnLoad = (circle: google.maps.Circle, index: number) => {
    // TODO: 同じ要素は1つのみにする
    setCircleArray((prevState) => [
      ...prevState,
      { circle: circle, id: index },
    ]);
  };

  // 必須らしい
  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(TESTCENTER);
    map.fitBounds(bounds);
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = undefined;
  }, []);

  navigator.geolocation.watchPosition((position) => {
    const { latitude, longitude } = position.coords;
    setCurrentPosition({ lat: latitude, lng: longitude });
    currentPositionCheck({ lat: latitude, lng: longitude });
    setIsCurrentPositionCheck(true);
  });

  const onClickInfoWindow = (data) => {
    alert(data);
  };

  return {
    circleOnLoad,
    currentPosition,
    currentoPositionIndex,
    isCurrentPosition,
    onClickInfoWindow,
    onLoad,
    onUnmount,
  };
};

export type GoogleMapPageProps = ReturnType<typeof useGoogleMapPageHook>;
