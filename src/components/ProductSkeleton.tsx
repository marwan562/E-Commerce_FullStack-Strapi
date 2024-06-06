import { Box, SkeletonCircle, SkeletonText, Stack } from "@chakra-ui/react";

const ProductSkeleton = () => {
  return (
    <Box padding="5" boxShadow="lg" bg="white">
      <SkeletonCircle boxSize={200} mx={"auto"} />
      <Stack mt="6" spacing="3">
        <SkeletonText
          px={12}
          mt="4"
          noOfLines={1}
          spacing="6"
          skeletonHeight="3"
        />
        <SkeletonText mt="4" noOfLines={4} spacing="5" skeletonHeight="3" />
      </Stack>
      <SkeletonText
        noOfLines={1}
        w={20}
        mt={5}
        spacing="7"
        skeletonHeight="5"
      />
    </Box>
  );
};

export default ProductSkeleton;
