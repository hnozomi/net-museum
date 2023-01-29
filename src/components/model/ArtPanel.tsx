import { Box, Center, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { Art } from '@/types/art-types';

type Props = {
  art: Art;
};

export const ArtPanel: FC<Props> = ({ art, ...props }) => {
  return (
    <Box {...props}>
      <Center py="2rem">
        <Stack p="1rem">
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
