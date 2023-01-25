import { useCallback, useState } from 'react';

import { POSITION } from '@/const';

export const useGoogleMapPageHook = () => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const [stationCircle, setStationCicle] = useState<
    google.maps.Circle | undefined
  >(undefined);
  const [sugiCircle, setSugiCicle] = useState<google.maps.Circle | undefined>(
    undefined,
  );

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

  return { activeMarker, onLoad, onUnmount, setStationCicle, setSugiCicle };
};

export type GoogleMapPageProps = ReturnType<typeof useGoogleMapPageHook>;
