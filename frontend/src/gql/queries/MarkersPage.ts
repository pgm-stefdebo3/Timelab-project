import { gql } from "@apollo/client";

const GET_MARKERS_DATA= gql`
query GetLayersData {
    markers {
        id
        name
        description
        type
        createdAt
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
