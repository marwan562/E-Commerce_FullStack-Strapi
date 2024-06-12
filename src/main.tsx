import React from "react";
import ReactDOM from "react-dom/client";
import MainLayout from "./layout/MainLayout";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import InternetConnecationProvider from "./Providers/InternetConnecationProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <InternetConnecationProvider>
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider>
            <MainLayout />
          </ChakraProvider>
        </PersistGate>
      </InternetConnecationProvider>
    </Provider>
  </React.StrictMode>
);
