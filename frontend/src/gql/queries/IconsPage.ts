import { gql } from "@apollo/client";

const GET_ICONS_PAGE = gql`
    query GetIcons {
        icons {
            id
            name
            fileName
        }
    }`
;

export default GET_ICONS_PAGE;
