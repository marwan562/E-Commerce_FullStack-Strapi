import {
  Grid,
  GridItem,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

const DetailsProductSkeleton = () => {
  return (
    <Grid templateColumns="repeat(5, 1fr)" m={20} gap={4}>
      <GridItem
        as={Skeleton}
        h={250}
        rounded={"md"}
        noOfLines={1}
        colSpan={2}
      />
      <GridItem as={SkeletonText} colStart={4} colEnd={6} />
      <GridItem as={SkeletonText} colStart={4} colEnd={6} />
      <GridItem as={SkeletonText} colStart={4} colEnd={6} />
    </Grid>
  );
};

export default DetailsProductSkeleton;
