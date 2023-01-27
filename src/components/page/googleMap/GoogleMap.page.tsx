import { NextPage } from 'next';
import { memo } from 'react';

import { GoogleMapContent } from '@/components/page/googleMap/components/GoogleMapContent';
import { useGoogleMapPageHook } from '@/components/page/googleMap/hooks/useGoogleMapPageHook';

const GoogleMapPage: NextPage = memo(() => {
  return <GoogleMapContent {...useGoogleMapPageHook()} />;
});

GoogleMapPage.displayName = Object.keys({ GoogleMapPage }).join();

export default GoogleMapPage;
