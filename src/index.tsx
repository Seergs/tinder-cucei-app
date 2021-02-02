import React from "react";
import { registerRootComponent } from "expo";
import Constants from "expo-constants";
import App from "./App";
import AppProviders from "./components/Providers";

const Index = () => {
  return (
    <AppProviders>
      <App />
    </AppProviders>
  );
};

registerRootComponent(Index);
