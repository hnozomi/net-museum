import { useRouter } from 'next/router';
import { useCallback, useLayoutEffect, useState } from 'react';

export const useGoogleMapPageHook = () => {
  const router = useRouter();
  const [currentPosition, setCurrentPosition] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral
  >({ lat: 0, lng: 0 });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [zoom, setZoom] = useState(14);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [mapCenter, setMapCenter] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral
  >({ lat: 0, lng: 0 });
  const [geolocationError, setGeolocationError] = useState(false);

  const [circleArray, setCircleArray] = useState<
    { circle: google.maps.Circle; id: number }[]
  >([]);

  const currentPositionCheck = (
    currentPosition: google.maps.LatLng | google.maps.LatLngLiteral,
  ) => {
    for (const position of circleArray) {
      const circle = position.circle.getBounds();
      if (circle?.contains(currentPosition)) {
        setCurrentPositionIndex(position.id);
        return;
      } else {
        setCurrentPositionIndex(0);
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
  const onLoad = useCallback(
    (
      map: google.maps.Map,
      currentPosition: google.maps.LatLng | google.maps.LatLngLiteral,
    ) => {
      const bounds = new window.google.maps.LatLngBounds(currentPosition);
      // map.fitBounds(bounds);
      map.setCenter(currentPosition);
      setZoom(14);
      setMap(map);
    },
    [],
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useLayoutEffect(() => {
    const id = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        navigator.geolocation.clearWatch(id);
        setCurrentPosition({ lat: latitude, lng: longitude });
        setMapCenter({ lat: latitude, lng: longitude });
        setGeolocationError(false);
      },
      (err) => {
        clearInterval(id);
        setGeolocationError(true);
      },
    );
  }, []);

  const getCurrentPosition = () => {
    if (geolocationError) return;
    const id = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // ここでidを解除しないと上手く取得できなかった
        navigator.geolocation.clearWatch(id);
        setCurrentPosition({ lat: latitude, lng: longitude });
        setGeolocationError(false);
        currentPositionCheck({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.log(err.code);
        setGeolocationError(true);
        clearInterval(id);
      },
    );
  };

  const id = setInterval(getCurrentPosition, 5000);

  const onClickInfoWindow = async (currentPositionIndex: number) => {
    clearInterval(id);
    router.push(`/meseum/${currentPositionIndex}`);
  };

  const centerMoved = () => {
    const center = map?.getCenter();
    if (!center) return;

    setMapCenter({ lat: center.lat(), lng: center.lng() });
  };

  return {
    centerMoved,
    circleOnLoad,
    currentPosition,
    currentPositionIndex,
    geolocationError,
    mapCenter,
    onClickInfoWindow,
    onLoad,
    onUnmount,
    zoom,
  };
};

export type GoogleMapPageProps = ReturnType<typeof useGoogleMapPageHook>;
