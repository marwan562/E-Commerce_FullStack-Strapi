import { Button, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HeaderAuthLogUser = () => {
  return (
    <Stack
      flex={{ base: 1, md: 0 }}
      justify={"flex-end"}
      direction={"row"}
      spacing={6}
    >
      <Button as={Link} to={"/auth/login"} fontSize={"sm"} fontWeight={400} variant={"link"}>
        Sign In
      </Button>
      <Button
        as={Link}
        to={"/auth/signup"}
        display={{ base: "none", md: "inline-flex" }}
        fontSize={"sm"}
        fontWeight={600}
        color={"white"}
        bg={"pink.400"}
        _hover={{
          bg: "pink.300",
        }}
      >
        Sign Up
      </Button>
    </Stack>
  );
};

export default HeaderAuthLogUser;
