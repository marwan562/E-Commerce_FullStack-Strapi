import { Box, Grid } from "@chakra-ui/react";
import ProductCard from "../components/UI/ProductCard";
import { useGetProductsQuery } from "../store/queries/getProductsApi";
import ProductSkeleton from "../components/ProductSkeleton";

const ProductPage = () => {
  const { data, isError, isLoading } = useGetProductsQuery("bulbasaur");

  const renderSkeletonProduct = Array(6)
    .fill(0)
    .map((_, inx) => <ProductSkeleton key={inx} />);

  return (
    <Box>
      <Box>
        <Grid
          margin={10}
          templateColumns="repeat(auto-fill, minmax(300px,1fr))"
          gap={6}
        >
          {isLoading ? (
            renderSkeletonProduct
          ) : isError ? (
            <p>Error</p>
          ) : (
            data?.data?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductPage;
