import dynamic from 'next/dynamic';

// import GoogleMapPage from '@/components/page/GoogleMap.page';

const GoogleMapPage = dynamic(
  () => import('@/components/page/googleMap/GoogleMap.page'),
  { ssr: false },
);

export default GoogleMapPage;
