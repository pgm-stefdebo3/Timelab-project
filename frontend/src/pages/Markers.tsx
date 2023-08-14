import { CrudDataGrid, DashboardMain, Header } from '../components';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

import '../sass/pages/dashboard.scss'
import { GET_MARKERS_DATA } from '../gql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { mutationRemoveMarker } from '../gql/mutations';
import { Button, Grid, Card } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


const Markers = () => {
    const { authenticated, authLoading, user } = useAuth();
    // needs optimizement using pagination (fetchMore, offset, limit)
    const { loading, error, data, refetch } = useQuery(GET_MARKERS_DATA);
    const [removeMarker] = useMutation(mutationRemoveMarker);

    if (authLoading) {
        return (
            <div>
                <div>Loading...</div>
            </div>
        );
    }
    
    if (!authenticated) {
        return <Navigate to="/login" replace/>;
    }

    if (loading) return <p>Loading...</p>;

    if (error) {
        return <p>Error...</p>;
    }

    const columns = [
        {
            field: "action",
            headerName: "",
            sortable: false,
            filterable: false,
            renderCell: (params: any) => {
              const onClick = (e: any) => {
                removeMarker({
                    variables: {
                        id: params.row.id
                    }
                });
                refetch();
              };
              return <Button onClick={onClick}><DeleteIcon sx={{ fill: '#FF0000', '&::hover': "#AA0000"}}/></Button>;
            }
        },
        { field: "id", headerName: "ID", width: 150 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "type", headerName: "Type", width: 150 },
        { field: "createdAt", headerName: "Created at", width: 250 },
        { field: "layer", headerName: "Layer", width: 150 },
        { field: "timestamps", headerName: "Timestamps", width: 150 },
    ];

    console.log(data.markers);
    

    const rows = data.markers.map((marker: any) => {
        const timestamps = marker.timestamps? marker.timestamps.length : 0;
        return {
            id: marker.id,
            name: marker.name,
            type: marker.type,
            layer: marker.layer.name,
            createdAt: `${new Date(marker.createdAt).toLocaleDateString()}\n ${new Date(marker.createdAt).toLocaleTimeString()}`,
            timestamps: timestamps,
        }
    });
    
  return (
    <div className='dashboard-container dashboard-container--markers'>
        <Header/>
        <DashboardMain active='markers'>
        <Grid container gap={1} style={{padding: '1rem'}}>
                <Grid xs={12}>
                    <Card 
                        sx={{
                            pt: '1rem',
                            pb: '1rem',
                            px: '1rem',
                            minHeight: '25rem',
                            maxWidth: '100%',
                        }}
                    >
                        <CrudDataGrid rows={rows} columns={columns} pageSize={15} pageSizeOptions={[15]}
                        />
                    </Card>
                </Grid>
            </Grid>
        </DashboardMain>
    </div>
  )
}

export default Markers;