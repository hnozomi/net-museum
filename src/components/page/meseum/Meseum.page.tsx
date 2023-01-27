import { NextPage } from 'next';
import { memo } from 'react';

import { MeseumContent } from '@/components/page/meseum/components/MeseumContent';
import { useMeseumPageHook } from '@/components/page/meseum/hooks/useMeseumPageHook';

const MeseumPage: NextPage = memo(() => {
  return <MeseumContent {...useMeseumPageHook()} />;
});

MeseumPage.displayName = Object.keys({ MeseumPage }).join();

export default MeseumPage;
