import { Box, Center, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { MeseumPageProps } from '@/components/page/meseum/hooks/useMeseumPageHook';

export const MeseumContent: FC<MeseumPageProps> = ({ artData }) => {
  console.log(artData);
  return (
    <Box w="100%">
      <Center py="2rem">
        <Stack w="90%">
          <Heading>{artData?.title}</Heading>
          <Text fontSize="0.8rem" m="0!important">
            {artData?.artistDisplayName}
          </Text>
          <Text fontSize="0.8rem" m="0!important">
            {artData?.artistNationality}
          </Text>
          <Image boxSize="md" src={artData?.primaryImage} />
        </Stack>
      </Center>
    </Box>
  );
};
