import { gql } from "@apollo/client";

const GET_IMPORTEXPORT_DATA= gql`
query GetLayersData {
    layers {
        id
        name
    }
    markers {
        id
    }
}
`;

export default GET_IMPORTEXPORT_DATA;