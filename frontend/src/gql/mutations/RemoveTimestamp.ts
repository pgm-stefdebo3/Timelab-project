import { gql } from "@apollo/client";

const mutationRemoveTimestamp = gql`
mutation removeTimestamp($id: Int!) {
    removeTimestamp(
        id: $id
    ) {
        __typename
    }
  }`;

export default mutationRemoveTimestamp;