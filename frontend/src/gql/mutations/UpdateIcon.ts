import { gql } from "@apollo/client";

const mutationUpdateIcon = gql`
mutation updateIcon($id: Int!, $name: String, $fileName: String) {
    updateIcon(
        updateIconInput: {
            id: $id
            name: $name
            fileName: $fileName
        }
    ) {
      id
      name
      fileName
    }
  }`;

export default mutationUpdateIcon;