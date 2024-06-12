import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Logo from "./Logo";
import { Link, NavLink } from "react-router-dom";
import CookieService from "../services/CookieService";
import HeaderMenuUser from "./HeaderMenuUser";
import HeaderAuthLogUser from "./HeaderAuthLogUser";
import CartDrawer from "./CartDrawer";
import { useAppDispatch, useAppSelector } from "../store";
import { useEffect } from "react";
import { logOutUserAction } from "../store/reducer/auth/AuthUserSlice";
import CartDrwerItems from "./CartDrwerItems";

const Links = ["Dashboard", "Products", "Team"];

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useAppDispatch();
  const token = CookieService.get("jwt");
  const { cartItems } = useAppSelector(({ cart }) => cart);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const totalQuantity = cartItems?.reduce(
    (total, item) => total + (item?.attributes?.quantity ?? 0),
    0
  );

  useEffect(() => {
    if (!token) {
      dispatch(logOutUserAction());
    }
  }, [dispatch, token]);

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.800")} px={10}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Link to={"/"}>
                <Logo />
              </Link>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link} to={`/${link}`}>
                  {link}
                </NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {token ? (
                <>
                  <CartDrawer
                    isOpen={isOpen}
                    onClose={onClose}
                    onOpen={onOpen}
                    nameButtom={`Cart (${totalQuantity})`}
                    HeaderTitle="Shopping Cart"
                    Footer={<Button>clear</Button>}
                  >
                    <CartDrwerItems />
                  </CartDrawer>
                  <HeaderMenuUser />
                </>
              ) : (
                <HeaderAuthLogUser />
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
