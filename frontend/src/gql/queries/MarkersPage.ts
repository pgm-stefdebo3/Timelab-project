import { gql } from "@apollo/client";

const GET_MARKERS_DATA= gql`
query GetLayersData {
    markers {
        id
        name
        description
        type
        createdAt
        coordinates {
            id
        }
        layer {
            id
            name
        }
        timestamps {
            id
        }
    }
}
`;

export default GET_MARKERS_DATA;
