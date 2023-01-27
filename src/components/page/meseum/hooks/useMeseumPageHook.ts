import { useEffect, useState } from 'react';

import { EUROPEANPAINTINGS } from '@/const/europeanPaintings';
import { axiosClient } from '@/libs/axios';
import { Art } from '@/types/art-types';

export const useMeseumPageHook = () => {
  const [artData, setArtData] = useState<Art[]>([]);

  useEffect(() => {
    const urls = generateUrls();
    fetchArtData(urls);
  }, []);

  // const urls = ["https://httpbin.org/status/200", "https://httpbin.org/status/201"];
  // const [hogeRes, fooRes] = await Promise.all(
  //   urls.map((url) => axios.get(url));
  // );

  const generateUrls = () => {
    const urls = [];
    for (let i = 0; i < 5; i++) {
      const randomNumber = Math.floor(
        Math.random() * EUROPEANPAINTINGS.length + 1,
      );

      urls.push(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${EUROPEANPAINTINGS[randomNumber]}`,
      );
    }

    return urls;
  };

  const fetchArtData = async (urls: string[]) => {
    await Promise.all(
      urls.map((url) =>
        axiosClient.get<Art>(url).then((res) => {
          console.log(res.data);
          setArtData((prevState) => [...prevState, res.data]);
        }),
      ),
    );
  };

  return { artData };
};

export type MeseumPageProps = ReturnType<typeof useMeseumPageHook>;
