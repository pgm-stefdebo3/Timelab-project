import { gql } from "@apollo/client";

const mutationCreateTimestamp = gql`
mutation createTimestamp($description: String!, $author: String, $fileName: String, $markerId: Int!) {
    createTimestamp(
        createTimestampInput: {
            description: $description
            author: $author
            fileName: $fileName
            markerId: $markerId
        }
    ) {
      id
      description
      author
      fileName
    }
  }`;

export default mutationCreateTimestamp;