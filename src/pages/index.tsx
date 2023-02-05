// import GoogleMapPage from '@/components/page/googleMap/GoogleMap.page';

import dynamic from 'next/dynamic';

const GoogleMapPage = dynamic(
  () => import('@/components/page/googleMap/GoogleMap.page'),
  { ssr: false },
);

export default GoogleMapPage;
