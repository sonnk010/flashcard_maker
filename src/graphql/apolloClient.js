import {ApolloClient, HttpLink, InMemoryCache, ApolloLink, concat} from '@apollo/client';
import { getCookie } from '../utils/cookie';
import { onError } from "@apollo/client/link/error";


const httpLink = new HttpLink({ uri: process.env.GRAPHQL_URL });

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(message)
      if (message === "bad jwt token") {
        console.log("here")
        window.location.href = "/login/"
      }
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
const token = getCookie("token");
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});


let links = [errorLink, authMiddleware, httpLink]

const link = ApolloLink.from(links);

const apolloClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default apolloClient;