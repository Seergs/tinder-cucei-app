import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AuthProvider } from "../context/AuthContext";
import { BASE_URL } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
const uri = `${BASE_URL}/graphql`;

const httpLink = createHttpLink({
  uri,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("jwt");

  let bearerToken: any;
  if (token) {
    bearerToken = `Bearer ${JSON.parse(token)}`;
  }

  return {
    headers: {
      ...headers,
      authorization: token ? bearerToken : null,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>{children}</AuthProvider>
    </ApolloProvider>
  );
}
