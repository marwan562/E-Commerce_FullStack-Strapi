import { Box } from "@chakra-ui/react";
import ProductDetails from "../components/ProductDetailUi";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailsApiQuery } from "../store/queries/getProductsApi";
import DetailsProductSkeleton from "../components/DetailsProductSkeleton";

const DetailsProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useGetProductDetailsApiQuery(id);

  useEffect(() => {
    if (data?.data?.attributes?.title) {
      document.title = `Details | ${data.data.attributes.title}`;
    }
  }, [data]);

  return (
    <Box>
      {isLoading ? (
        <DetailsProductSkeleton />
      ) : isError ? (
        <p>Error</p>
      ) : data && data.data ? (
        <ProductDetails data={data.data} />
      ) : (
        <p>No data available</p>
      )}
    </Box>
  );
};

export default DetailsProduct;
