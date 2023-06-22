import { gql } from "@apollo/client";

const GET_MAPS_DATA= gql`
query GetLayersData {
    layers {
        id
        name
        markers {
            id
            name
            coordinates {
                latitude
                longitude
            }
        }
    }
}
`;

export default GET_MAPS_DATA;
