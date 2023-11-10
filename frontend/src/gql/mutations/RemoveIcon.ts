import { gql } from "@apollo/client";

const mutationRemoveIcon = gql`
mutation removeIcon($id: Int!) {
    removeIcon(
        id: $id
    ) {
        __typename
    }
  }`;

export default mutationRemoveIcon;