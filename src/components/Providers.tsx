import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  ApolloLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "apollo-link-error";
import { BASE_URL } from "../constants";

const uri = `${BASE_URL}/graphql`;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log("graphqlerror", graphQLErrors);
  }
  if (networkError) {
    console.log("network errors", networkError);
  }
});

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
