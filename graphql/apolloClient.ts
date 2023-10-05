import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/link-context";
import { onError } from "@apollo/link-error";

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      console.error(`GraphQL Error: ${message}`);
    });
  }

  if (networkError) {
    console.error(`Network Error: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: errorLink.concat(authLink).concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
