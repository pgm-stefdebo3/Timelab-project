import { gql } from "@apollo/client";

const mutationCreateIcon = gql`
mutation createIcon($name: String!, $fileName: String!) {
    createIcon(
        createIconInput: {
            name: $name
            fileName: $fileName
        }
    ) {
      id
      name
      fileName
    }
  }`;

export default mutationCreateIcon;