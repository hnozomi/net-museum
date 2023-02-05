import '@splidejs/splide/css';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import { FC } from 'react';

import { ArtPanel } from '@/components/model/ArtPanel';
import { MeseumPageProps } from '@/components/page/meseum/hooks/useMeseumPageHook';

export const MeseumContent: FC<MeseumPageProps> = ({ artData }) => {
  return (
    <Splide
      aria-label="アート"
      options={{
        autoplay: false, // 自動再生を有効
        interval: 3000, // 自動再生の間隔を3秒に設定
      }}
    >
      {artData.map((data, index) => (
        // <SplideSlide key={data.title}>
        <SplideSlide key={index}>
          <ArtPanel art={data} />
        </SplideSlide>
      ))}
    </Splide>
  );
};
