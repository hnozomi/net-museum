import { Card, CardBody, Center, Text } from '@chakra-ui/react';

export const ErrorPanel = () => {
  return (
    <Center>
      <Card bg="red.500" mt="5rem" w="90%">
        <CardBody>
          <Text color="white" fontWeight="bold">
            位置情報の取得に失敗しました。
            <br />
            位置情報の取得を許可しているか確認してください
          </Text>
        </CardBody>
      </Card>
    </Center>
  );
};
