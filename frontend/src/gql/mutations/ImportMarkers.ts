import { gql } from "@apollo/client";

const mutationImportMarkers = gql`
mutation createMarkersWithCoords($createMarkerWithCoordsInputs: [CreateMarkerWithCoordsInput!]!) {
    createMarkersWithCoords(
        createMarkerWithCoordsInputs: $createMarkerWithCoordsInputs
    ) {
        id
        name
        description
        coordinates {
          id
        }
      }
  }`;

export default mutationImportMarkers;