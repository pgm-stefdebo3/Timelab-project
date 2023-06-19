import { gql } from "@apollo/client";

const mutationCreateLayer = gql`
mutation createLayer($name: String!, $private: Boolean!) {
    createLayer(
        createLayerInput: {
            name: $name
            private: $private
        }
    ) {
      id
      name
      private
    }
  }`;

export default mutationCreateLayer;