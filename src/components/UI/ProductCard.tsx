import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IProductTypes } from "../../interfaces";
import { useNavigate } from "react-router-dom";

type TProps = {
  product: IProductTypes;
};

const ProductCard = ({ product }: TProps) => {
  const { attributes, id } = product;
  const navigate = useNavigate();

  const showDetailHandler = () => {
    navigate(`/products/${id}`);
  };

  return (
    <Card border="1px solid #555">
      <CardBody>
        <Image
          src={`${import.meta.env.VITE_SERVER_URL}${
            attributes?.image?.data?.attributes?.url
          }`}
          alt="Green double couch with wooden legs"
          boxSize={200}
          mx={"auto"}
          borderRadius="50%"
        />
        <Stack mt="6" spacing="3">
          <Heading mx={"auto"} size="md">
            {attributes.title}
          </Heading>
          <Text>{attributes.description}</Text>
        </Stack>
      </CardBody>
      <Text ml={5} mx={"auto"} mb={2} color="blue.700" fontSize="2xl">
        {attributes.category.data.attributes.category}
      </Text>
      <Text ml={5} mb={2} color="blue.600" fontSize="2xl">
        ${attributes.price}
      </Text>

      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            onClick={showDetailHandler}
            variant="solid"
            colorScheme="blue"
          >
            View Details
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
