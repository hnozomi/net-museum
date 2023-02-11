import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { All_ART } from '@/constants';
import { axiosClient } from '@/libs/axios';
import { Art } from '@/types/art-types';

export const useMeseumPageHook = () => {
  const router = useRouter();
  const [artData, setArtData] = useState<Art[]>([]);

  useEffect(() => {
    fetchArtData(generateUrls());
  }, []);

  const extractCurrentArt = () => {
    if (!All_ART) return [];

    for (const art of All_ART) {
      if (art.departmentId === router.query.artId) {
        return art.arts;
      }
    }
  };

  const generateUrls = () => {
    const urls = [];

    const currentArt = extractCurrentArt();
    if (!currentArt) return [];

    for (let i = 0; i < 5; i++) {
      const randomNumber = Math.floor(Math.random() * currentArt.length);

      urls.push(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${currentArt[randomNumber]}`,
      );
    }

    return urls;
  };

  const fetchArtData = async (urls: string[]) => {
    await Promise.all(
      urls.map((url) =>
        axiosClient.get<Art>(url).then((res) => {
          setArtData((prevState) => [...prevState, res.data]);
        }),
      ),
    );
  };

  // isPublicDomainのオブジェクトを抽出する
  // const publicDomain = [];

  // artData.forEach((art) => {
  //   if (art.isPublicDomain) {
  //     publicDomain.push(art.objectID);
  //   }
  // });
  // console.log(publicDomain);
  return { artData };
};

export type MeseumPageProps = ReturnType<typeof useMeseumPageHook>;
