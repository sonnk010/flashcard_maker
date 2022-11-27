import {ApolloClient, HttpLink, InMemoryCache, ApolloLink, concat} from '@apollo/client';
import { getCookie } from '../utils/cookie';


const httpLink = new HttpLink({ uri: process.env.GRAPHQL_URL });

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

const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;