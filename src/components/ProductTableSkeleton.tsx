import React from "react";
import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

const ProductTableSkeleton = () => {
  return (
    <Box>
      <Skeleton height="20px" mb={4} />
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <SkeletonText mt={4} noOfLines={1} spacing="4" />
        <SkeletonText mt={2} noOfLines={1} spacing="4" />
        <Skeleton height="200px" />
      </Box>
    </Box>
  );
};

export default ProductTableSkeleton;
