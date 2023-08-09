import { gql } from "@apollo/client";

const GET_DASHBOARD_DATA= gql`
query GetDashboardData {
    layers {
        id
        createdAt
    }
    markers {
        id
        createdAt
    }
    timestamps {
        id
        createdAt
    }
}
`;

export default GET_DASHBOARD_DATA;
