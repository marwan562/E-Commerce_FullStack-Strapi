import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { ReactNode, useRef } from "react";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  nameButtom: string;
  HeaderTitle: string;
  Footer: ReactNode;
  children?: ReactNode;
};

const CartDrawer = ({
  isOpen,
  onClose,
  onOpen,
  HeaderTitle,
  nameButtom,
  children,
  Footer,
}: TProps) => {

  const btnRef = useRef(null);

  return (
    <>
      <Button ref={btnRef} colorScheme="gray" onClick={onOpen}>
        {nameButtom}
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{HeaderTitle}</DrawerHeader>

          <DrawerBody>{children}</DrawerBody>

          <DrawerFooter>{Footer}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
