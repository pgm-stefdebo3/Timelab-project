import { gql } from "@apollo/client";

const GET_MAPS_DATA= gql`
query GetLayersData {
    layers {
        id
        name
        createdAt
        markers {
            id
            name
            layerId
            coordinates {
                latitude
                longitude
            }
        }
    }
}
`;

export default GET_MAPS_DATA;
