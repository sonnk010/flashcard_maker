import fetch from 'isomorphic-fetch';
import {ApolloClient, HttpLink, InMemoryCache, ApolloLink, concat} from '@apollo/client';
import { getCookie } from '../utils/cookie';
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({ uri: process.env.GRAPHQL_URL, fetch});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message === "bad jwt token") {
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

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getCardsWithCursor: {
            keyArgs: false,
            merge(
              existing,
              incoming,
              {
                args: { pageInfo },
                readField, 
              }) 
            {
              let result = {...incoming}

              if (existing && existing["data"]?.length > 0) {
                result["data"] = existing["data"].concat(incoming["data"])
              }
            
              return result
            },
            // read(existing) {
            //   if (existing) {
            //     return {
            //       cursor: existing.cursor,
            //       // cards: Object.values(existing.data),
            //     };
            //   }
            // },
          }
        }
      }
    }
  }),
});

export default client;