import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { TESTCENTER } from '@/const';
import { axiosClient } from '@/libs/axios';

export const useGoogleMapPageHook = () => {
  const router = useRouter();
  const [currentPosition, setCurrentPosition] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral
  >({ lat: 0, lng: 0 });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  // const [isCurrentPosition, setIsCurrentPositionCheck] = useState(true);

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
  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(TESTCENTER);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    const options = {
      timeout: 5000,
    };
    const id = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // ここでidを解除しないと上手く取得できなかった
        navigator.geolocation.clearWatch(id);
        setCurrentPosition({ lat: latitude, lng: longitude });
        currentPositionCheck({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.log(err);
      },
      options,
    );
  }, []);

  const onClickInfoWindow = async () => {
    router.push('/meseum');
    const response = await axiosClient.get(
      'https://collectionapi.metmuseum.org/public/collection/v1/objects/437174',
    );
  };

  return {
    circleOnLoad,
    currentPosition,
    currentPositionIndex,
    // isCurrentPosition,
    onClickInfoWindow,
    onLoad,
    onUnmount,
  };
};

export type GoogleMapPageProps = ReturnType<typeof useGoogleMapPageHook>;
