import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';


interface CrudDataGridProps {
    deleteRow: (id: number) => void;
    rows: any[];
    columns: any[];
}

const CrudDataGrid = ({deleteRow, rows, columns}: CrudDataGridProps) => {
  return (
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
    />
  );
};

export default CrudDataGrid;