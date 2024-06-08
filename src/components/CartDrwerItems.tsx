import { Box, Button, Flex, Image, Text, useToast } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  addToCartAction,
  decrementCartAction,
  removeItemFromCart,
} from "../store/reducer/Cart/cartSlice";
import { IProductTypes } from "../interfaces";

const CartDrwerItems = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { cartItems } = useAppSelector(({ cart }) => cart);

  const textSlicer = (text: string): string => {
    if (text.length > 12) {
      return `${text.slice(0, 15)}...`;
    }
    return text;
  };

  const removeItemHanlder = (id: number) => {
    dispatch(removeItemFromCart({ id }));
    toast({
      title: "Removed Successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const incrementHandler = (data: IProductTypes) => {
    dispatch(addToCartAction(data));
    toast({
      title: "Increment Successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const decrementHandler = (data: IProductTypes) => {
    dispatch(decrementCartAction(data));
    if (data.attributes.quantity === 1) {
      removeItemHanlder(data.id);
    } else {
      toast({
        title: "Decremented Successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const renderItems =
    cartItems.length > 0 ? (
      cartItems.map((item) => {
        const data = item?.attributes;
        const imageUrl = data?.image?.data?.attributes?.url;

        return (
          <Box py={3} px={2} key={item?.id}>
            <Flex mb={2} alignItems={"center"} gap={3}>
              {imageUrl ? (
                <Image
                  boxSize="20"
                  src={`${import.meta.env.VITE_SERVER_URL}${imageUrl}`}
                  alt={data?.title}
                />
              ) : (
                <Box
                  boxSize="20"
                  bg="gray.200"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  No Image
                </Box>
              )}
              <Box>
                <Text>{textSlicer(data?.title)}</Text>
                <Text textColor={"gray"}>Price: ${data?.price}</Text>
                <Flex>
                  <Text
                    mr={1}
                    fontSize={15}
                    mb={1}
                    textColor={data?.stock !== 0 ? "lightgreen" : "red.500"}
                  >
                    Stock: {data?.stock}
                  </Text>
                  <div> | </div>
                  <Text ml={1} fontSize={15} mb={1} textColor={"lightgreen"}>
                    Quantity: {data?.quantity}
                  </Text>
                </Flex>
                <Box>
                  <Button
                    onClick={() => decrementHandler(item)}
                    roundedRight={"inherit"}
                    size={"sm"}
                  >
                    -
                  </Button>
                  <Button
                    onClick={() => removeItemHanlder(item.id)}
                    variant={"solid"}
                    colorScheme={"red"}
                    roundedRight={"inherit"}
                    roundedLeft={"inherit"}
                    size={"sm"}
                  >
                    Remove
                  </Button>
                  <Button
                    cursor={data?.stock === 0 ? "not-allowed" : "inherit"}
                    disabled={data?.stock === 0 ? true : false}
                    onClick={() => incrementHandler(item)}
                    roundedLeft={"inherit"}
                    size={"sm"}
                  >
                    +
                  </Button>
                </Box>
              </Box>
            </Flex>
            <hr />
          </Box>
        );
      })
    ) : (
      <p>No items</p>
    );

  return <Box>{renderItems}</Box>;
};

export default CartDrwerItems;
