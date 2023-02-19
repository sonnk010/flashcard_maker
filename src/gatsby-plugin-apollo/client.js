import { WebSocketLink } from '@apollo/client/link/ws'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, split} from '@apollo/client'
import { getCookie } from '../utils/cookie'
import { getMainDefinition } from '@apollo/client/utilities'
import fetch from 'isomorphic-fetch';

const wsLinkWithoutAuth = () =>
  new WebSocketLink({
    uri: process.env.WS_URL,
    options: {
      reconnect: true,
    },
  })

const wsLinkWithAuth = (token) =>
  new WebSocketLink({
    uri: process.env.WS_URL,
    options: {
      reconnect: true,
      connectionParams: {
        authToken: `Bearer ${token}`,
      },
    }
  })

function createIsomorphLink() {
  return new HttpLink({
    uri: process.env.GRAPHQL_URL,
    fetch
  })
}

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map((err) => {
      console.warn(err.message)
    })
  }
  if (networkError) {
    console.warn(networkError)
  }
})

const authLink = setContext((_, { headers }) => {
  let token = getCookie("token")
  const authorization = token ? `Bearer ${token}` : null
  return token
    ? {
        headers: {
          ...headers,
          authorization,
        },
      }
    : {
        headers: {
          ...headers,
        },
      }
})

const httpLink = ApolloLink.from([errorLink, authLink, createIsomorphLink()])

function createApolloClient(initialState = {}) {
  const ssrMode = typeof window === 'undefined'
  const cache = new InMemoryCache({
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
  });

  const link = !ssrMode ? split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLinkWithAuth(""),
    httpLink
  ) : httpLink

  return new ApolloClient({
    ssrMode,
    link,
    cache,
  })
}

const client = createApolloClient();

export default client;