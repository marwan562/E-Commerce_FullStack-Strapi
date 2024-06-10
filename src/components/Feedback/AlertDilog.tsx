import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

type TProps = {
  onClose: () => void;
  isOpen: boolean;
  headerDilog: string;
  bodyDilog: string;
  children:ReactNode
};

const AlertDilog = ({
  isOpen,
  onClose,
  headerDilog,
  bodyDilog,
  children,
}: TProps) => {
  const cancelRef = React.useRef();

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{headerDilog}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{bodyDilog}</AlertDialogBody>
          <AlertDialogFooter>
            <Button mr={3} ref={cancelRef} onClick={onClose}>
              Cansel
            </Button>
            {children}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AlertDilog;
