import React from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';

  interface DeconstructedObject {
    [key: string]: any;
  }

const MarkerDataGrid = ({json}: {json: any}) => {
  const [rowSelectionModel, setRowSelectionModel] = React.useState<any[]>([]);

  

function deconstructObject(obj: any, parentKey: string = '', result: DeconstructedObject = {}) {
  for (const key in obj) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      deconstructObject(obj[key], newKey, result);
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}

// deconstruct the json so the values can fit inside the data grid
const deconstructedJson = json.map((obj: any) => deconstructObject(obj));
console.log(deconstructedJson);

// get the keys from the first object in the array
const exampleObject = deconstructObject(json[0]);
const deconstructedKeys = Object.keys(exampleObject);

// create the columns for the data grid
const columns: GridColDef[] = deconstructedKeys.map((key: string) => ({
  field: key,
  headerName: key,
  width: 150,
}));

// create the rows for the data grid
const rows = deconstructedJson.map((obj: any, index: number) => ({
  id: index,
  ...obj,
}));

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          width: '100%',
        }}
        initialState={{
        pagination: {
            paginationModel: { page: 0, pageSize: 10 },
        },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
          console.log(newRowSelectionModel);
        }}
      />
    </>
  )
};

export default MarkerDataGrid;