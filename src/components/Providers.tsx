import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://192.168.0.8:5000/graphql",
  cache: new InMemoryCache(),
});

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
