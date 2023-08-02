import { gql } from "@apollo/client";

const mutationRemoveLayer = gql`
mutation removeLayer($id: Int!) {
    removeLayer(
        id: $id
    ) {
        __typename
    }
  }`;

export default mutationRemoveLayer;