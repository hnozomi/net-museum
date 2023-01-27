import { useJsApiLoader } from '@react-google-maps/api';
import { NextPage } from 'next';
import { memo } from 'react';

import { GoogleMapContent } from '@/components/page/googleMap/components/GoogleMapContent';

const GoogleMapPage: NextPage = memo(() => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    id: 'google-map-script',
  });

  // ロード完了してからコンポーネント表示
  return isLoaded ? <GoogleMapContent /> : <></>;
});

GoogleMapPage.displayName = Object.keys({ GoogleMapPage }).join();

export default GoogleMapPage;
