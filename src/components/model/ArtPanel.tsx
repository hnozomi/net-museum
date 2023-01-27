import { Box, Center, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { Art } from '@/types/art-types';

type Props = {
  art: Art;
};

export const ArtPanel: FC<Props> = ({ art, ...props }) => {
  return (
    <Box w="100%" {...props}>
      <Center py="2rem">
        <Stack w="90%">
          <Heading>{art?.title}</Heading>
          <Text fontSize="0.8rem" m="0!important">
            {art?.artistDisplayName}
          </Text>
          <Text fontSize="0.8rem" m="0!important">
            {art?.artistNationality}
          </Text>
          <Image boxSize="md" src={art?.primaryImage} />
        </Stack>
      </Center>
    </Box>
  );
};
