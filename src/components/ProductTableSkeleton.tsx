import { Box, Flex, Skeleton, Stack } from "@chakra-ui/react";

const ProductTableSkeleton = () => {
  return (
    <Stack mx={"auto"} my={10}>
      {Array.from(
        {
          length: 10,
        },
        (_, inx) => (
          <Flex
            key={inx}
            gap={5}
            alignItems={"center"}
            justifyContent={"center"}
            border={"1px solid #333"}
            h={"50px"}
            p={2}
            rounded={"md"}
          >
            <Skeleton h="9px" w={"120px"} bg={"gray"} />
            <Skeleton h="9px" w={"120px"} bg={"gray"} />
            <Skeleton h="9px" w={"120px"} bg={"gray"} />
            <Skeleton h="9px" w={"120px"} bg={"gray"} />
            <Flex>
              <Skeleton
                h="30px"
                startColor="purple.300"
                w={"50px"}
                endColor="purple.500"
                mr={3}
              />
              <Skeleton
                h="30px"
                startColor="red.300"
                w={"50px"}
                endColor="red.500"
                mr={3}
              />
              <Skeleton
                h="30px"
                startColor="blue.300"
                w={"50px"}
                endColor="blue.500"
              />
            </Flex>
          </Flex>
        )
      )}
      <Box>
        <Skeleton h="15px" w={"250px"} bg={"gray"} mx={"auto"} />
      </Box>
    </Stack>
  );
};

export default ProductTableSkeleton;
