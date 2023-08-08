import { gql } from "@apollo/client";

const GET_LAYERS_DATA= gql`
query GetLayersData {
    layers {
        id
        name
        private
        createdAt
        markers {
            id
        }
    }
}
`;

export default GET_LAYERS_DATA;
