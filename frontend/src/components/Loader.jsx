import { Spinner, Flex, Text } from "@chakra-ui/react";
import { useLoading } from "../context/LoadingContext";

const Loader = () => {
  const { loading } = useLoading();

  if (!loading) return null; 

  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      bg="rgba(0, 0, 0, 0.5)"
      justify="center"
      align="center"
      zIndex={9999}
    >
      <Flex
        direction="column"
        align="center"
        bg="white"
        p={6}
        borderRadius="md"
        boxShadow="lg"
      >
        <Spinner size="xl" color="black" />
        <Text mt={3} fontWeight="bold" color="black">
          Loading...
        </Text>
      </Flex>
    </Flex>
  );
};

export default Loader;
