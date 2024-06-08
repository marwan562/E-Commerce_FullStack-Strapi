import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useToast,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { IProductTypes } from "../interfaces";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { addToCartAction } from "../store/reducer/Cart/cartSlice";

export default function ProductDetails({ data }: { data: IProductTypes }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const response = data?.attributes;

  const addToCartHandler = () => {
    dispatch(addToCartAction(data));
    toast({
      title: `Successfully ${response.title} in Cart.`,
      description: "We've created your account for you.",
      position: "top-right",
      status: "success",
      duration: 3000,

      isClosable: true,
    });
  };

  return (
    <Container maxW={"7xl"}>
      <Button onClick={() => navigate(-1)} color={"ActiveCaption"} mt={2}>
        <ArrowBackIcon mr={1} />
        Back
      </Button>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 10 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={`${import.meta.env.VITE_SERVER_URL}${
              response?.image?.data?.attributes?.url
            }`}
            fit={"cover"}
            align={"center"}
            w={"90%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {response.title}
            </Heading>
            <Stat>
              <Flex gap={2}>
                <StatLabel fontSize={{ base: "2xl" }}>Price:</StatLabel>
                <StatNumber>${response?.price}</StatNumber>
              </Flex>
              <StatHelpText>
                Updated At: {new Date(response?.updatedAt).toLocaleDateString()}
              </StatHelpText>
            </Stat>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
              >
                {response?.description}
              </Text>
            </VStack>

            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Product Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Stock:
                  </Text>{" "}
                  {response?.stock}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Brand:
                  </Text>{" "}
                  {response?.brand}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Discount:
                  </Text>{" "}
                  %
                  {response?.discountPercentage
                    ? (response?.discountPercentage * 1) % 100
                    : 0}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Category:
                  </Text>{" "}
                  {response?.category.data.attributes.category}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Dial color:
                  </Text>{" "}
                  Black
                </ListItem>
              </List>
            </Box>
          </Stack>

          <Button
            onClick={addToCartHandler}
            rounded={"none"}
            w={"full"}
            mt={1}
            size={"lg"}
            py={"7"}
            bg={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
          >
            Add to cart
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
