import { gql } from '@apollo/client';

export const GET_COURSES = gql`
  query getCourses {
    getCourses{
      id
      userId
      name
      description
    }
  }
`;

export const GET_CARDS = gql`
  query getCards($courseID: String) {
    getCards(CourseID: $courseID) {
      id
      terminology
      definition
      courseId
      __typename
    }
  }
`;

export const GET_SUBSCRIPTION = gql`
  query getSubscription {
    getSubscription{
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

export const GET_CARDS_WITH_CURSOR = gql`
  query getCardsWithCursor($input: GetCardsInput) {
    getCardsWithCursor(
      input: $input
    ) {
      data {
        id
        terminology
        definition
        courseId
        __typename
      }
      pageInfo {
        cursor
        hasNextPage
        __typename
      }
    }
  }
`