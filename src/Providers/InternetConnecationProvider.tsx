import { ReactNode, useEffect, useRef } from "react";
import { useToast } from "@chakra-ui/react";
import { BsWifiOff, BsWifi } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../store";
import { getNetworkAction } from "../store/reducer/network";

const InternetConnecationProvider = ({ children }: { children: ReactNode }) => {
  const toastIdRef = useRef();
  const toast = useToast();
  const { network } = useAppSelector(({ network }) => network);
  const dispatch = useAppDispatch();
  function addToastOffline() {
    toastIdRef.current = toast({
      title: "You'r Offline.",
      description: "Please make sure you'r internet connection.",
      status: "warning",
      duration: null,
      isClosable: true,
      icon: <BsWifiOff />,
    });
  }
  function addToastOnline() {
    toastIdRef.current = toast({
      title: "You'r Online.",
      description: "Please evry time check internet connection.",
      status: "success",
      duration: 2000,
      isClosable: true,
      icon: <BsWifi />,
    });
  }
  function closeAll() {
    // you may optionally pass an object of positions to exclusively close
    // keeping other positions opened
    // e.g. `{ positions: ['bottom'] }`
    toast.closeAll();
  }

  useEffect(() => {
    window.addEventListener("offline", () => {
      dispatch(getNetworkAction(false));
    });

    window.addEventListener("online", () => {
      dispatch(getNetworkAction(true));
    });

    return () => {
      removeEventListener("online", () => {
        dispatch(getNetworkAction(true));
      });
      removeEventListener("offline", () => {
        dispatch(getNetworkAction(false));
      });
    };
  }, [dispatch]);

  if (!network) {
    closeAll();
    return (
      <>
        {children} {addToastOffline()}
      </>
    );
  }
  closeAll();
  return (
    <>
      {children} {addToastOnline()}
    </>
  );
};

export default InternetConnecationProvider;
