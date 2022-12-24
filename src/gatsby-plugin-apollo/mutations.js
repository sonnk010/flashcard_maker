import {gql} from '@apollo/client';


export const CREATE_CARD = gql`
  mutation createCard($courseID: String!, $terminology: String, $definition: String) {
    createCard(input: {
      courseId: $courseID,
      terminology: $terminology
      definition: $definition
    }) {
      id
      terminology
      definition
      courseId
      __typename
    }
  }
`;

export const CREATE_CARD_FROM_CLIPBOARD = gql`
  mutation createCardsFromText($name: String!, $description: String, $text: String!) {
    createCardsFromText(input: {
      name: $name
      description: $description
      text: $text
    }) {
      id
      terminology
      definition
      courseId
      __typename
    }
  }
`;

export const SET_SUBSCRIBE = gql`
  mutation setSubscribe ($sub: String) {
    setSubscribe(input: {
      sub: $sub
    }) {
      id
      userID
      courseID
      sub
      subscribeState
      everyMinute
      __typename
    }
  }
`

export const SET_SUBSCRIPTION = gql`
  mutation setSubscribe ($courseID: String, $subscribeState: Boolean, $everyMinute: Int) {
    setSubscribe(input: {
      courseID: $courseID
      subscribeState: $subscribeState
      everyMinute: $everyMinute
    }) {
      id
      userID
      courseID
      sub
      subscribeState
      everyMinute
      __typename
    }
  }
`
