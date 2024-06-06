import { Box } from "@chakra-ui/react";
import ProductDetails from "../components/ProductDetailUi";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailsApiQuery } from "../store/queries/getProductsApi";
import DetailsProductSkeleton from "../components/DetailsProductSkeleton";

const DetailsProduct = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetProductDetailsApiQuery(id);
  const response = data?.data?.attributes;

  useEffect(() => {
    document.title = `Details | ${response?.title}`;
  });
  return (
    <Box>
      {isLoading ? (
        <DetailsProductSkeleton />
      ) : isError ? (
        <p>Error</p>
      ) : (
        <ProductDetails response={response} />
      )}
    </Box>
  );
};

export default DetailsProduct;
