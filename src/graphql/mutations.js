import { gql } from '@apollo/client';


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