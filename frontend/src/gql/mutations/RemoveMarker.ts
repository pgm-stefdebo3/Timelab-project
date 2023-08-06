import { gql } from "@apollo/client";

const mutationRemoveMarker = gql`
mutation removeMarker($id: Int!) {
    removeMarker(
        id: $id
    ) {
        __typename
    }
  }`;

export default mutationRemoveMarker;