import { Button } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import React from 'react';
import { CrudDataGridProps } from '../interfaces';

const CrudDataGrid = ({rows, columns}: CrudDataGridProps) => {
  return (
    <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        sx={{
          width: '100%',
        }}
        initialState={{
          pagination: {
              paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
    />
  );
};

export default CrudDataGrid;