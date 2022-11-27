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