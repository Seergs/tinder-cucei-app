import React from "react";
import FullpageSpinner from "./components/FullpageSpinner";
import useAuth from "./hooks/useAuth";
import AuthApp from "./components/AuthApp";
import UnauthApp from "./components/UnauthApp";

export default function App() {
  const { isAuthenticated, isPending } = useAuth();

  if (isPending) return <FullpageSpinner />;

  return isAuthenticated ? <AuthApp /> : <UnauthApp />;
}
