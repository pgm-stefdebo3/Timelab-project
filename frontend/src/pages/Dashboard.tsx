import { DashboardMain, Header } from '../components';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';
import MarkerIcon from '@mui/icons-material/Room';
import TimestampIcon from '@mui/icons-material/AccessTimeFilled';
import LayersIcon from '@mui/icons-material/Layers';
import { Button, Grid, Card } from "@mui/material";
import CountUp from 'react-countup';

import '../sass/pages/dashboard.scss'


const Dashboard = () => {

    const { authenticated, authLoading, user } = useAuth();

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
    
  return (
    <div className='dashboard-container'>
        <Header/>
        <DashboardMain active='dashboard'>
            <Grid container gap={1} style={{padding: '1rem'}}>
                <Grid xs={3.95}>
                    <Card 
                        sx={{
                            pt: '4.5rem',
                            pb: '1rem'
                        }}
                    >
                        <div className='countup-container'>
                            <CountUp end={9} duration={3} className='countup-number'/>
                            <div className='flex countup-suffix'>
                                <p className='countup-string'>Layers</p>
                                <LayersIcon 
                                    className='countup-icon'
                                    sx={{
                                        width: '3rem',
                                        height: '3rem',
                                        marginLeft: '0.1rem',
                                    }}
                                />
                            </div>
                        </div>
                        <Button 
                            href='/layers'
                            sx={{
                                display: 'flex',
                                justifyContent: 'end',
                                margin: '2.5rem 1rem 0 auto',
                                width: 'max-content'
                            }}
                        
                        >
                            Go to Layers
                        </Button>
                    </Card>
                </Grid>
                <Grid xs={3.95}>
                    <Card 
                        sx={{
                            pt: '4.5rem',
                            pb: '1rem'
                        }}
                    >
                        <div className='countup-container'>
                            <CountUp end={243} duration={3} className='countup-number'/>
                            <div className='flex countup-suffix'>
                                <p className='countup-string'>Markers</p>
                                <MarkerIcon 
                                    className='countup-icon'
                                    sx={{
                                        width: '3rem',
                                        height: '3rem',
                                        marginLeft: '0.1rem',
                                    }}
                                />
                            </div>
                        </div>
                        <Button 
                            href='/markers'
                            sx={{
                                display: 'flex',
                                justifyContent: 'end',
                                margin: '2.5rem 1rem 0 auto',
                                width: 'max-content'
                            }}
                        
                        >
                            Go to markers
                        </Button>
                    </Card>
                </Grid>
                <Grid xs={8}>
                    <Card 
                        sx={{
                            pt: '4.5rem',
                            pb: '1rem',
                        }}
                    >
                        <div className='countup-container'>
                            <CountUp end={455489} duration={3} className='countup-number'/>
                            <div className='flex countup-suffix'>
                                <p className='countup-string'>Timestamps</p>
                                <TimestampIcon 
                                    className='countup-icon'
                                    sx={{
                                        width: '3rem',
                                        height: '3rem',
                                        marginLeft: '0.1rem',
                                    }}
                                />
                            </div>
                        </div>
                        <Button 
                            href='/timestamps'
                            sx={{
                                display: 'flex',
                                justifyContent: 'end',
                                margin: '2.5rem 1rem 0 auto',
                                width: 'max-content'
                            }}
                        
                        >
                            Go to Timestamps
                        </Button>
                    </Card>
                </Grid>
            </Grid>
        </DashboardMain>
    </div>
  )
}

export default Dashboard;