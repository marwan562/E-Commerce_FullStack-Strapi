import { Outlet } from "react-router-dom";
import Nav from "../components/NavBar";
import { Box } from "@chakra-ui/react";
import LargeWithAppLinksAndSocial from "../components/Footer";

const NavLayout = () => {
  return (
    <>
      <Nav />
      <Box>
        <Outlet />
      </Box>
      <LargeWithAppLinksAndSocial />
    </>
  );
};

export default NavLayout;
