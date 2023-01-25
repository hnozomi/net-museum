import { useJsApiLoader } from '@react-google-maps/api';
import { NextPage } from 'next';
import { memo } from 'react';

import { GoogleMapContent } from '@/components/page/components/GoogleMapContent';

const GoogleMapPage: NextPage = memo(() => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    id: 'google-map-script',
  });

  return isLoaded ? <GoogleMapContent /> : <></>;
});

GoogleMapPage.displayName = Object.keys({ GoogleMapPage }).join();

export default GoogleMapPage;
