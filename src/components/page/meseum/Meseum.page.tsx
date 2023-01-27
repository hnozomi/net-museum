import { NextPage } from 'next';
import { memo } from 'react';

import { MeseumContent } from '@/components/page/meseum/components/MeseumContent';

const MeseumPage: NextPage = memo(() => {
  return <MeseumContent />;
});

MeseumPage.displayName = Object.keys({ MeseumPage }).join();

export default MeseumPage;
