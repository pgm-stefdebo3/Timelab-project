import { DashboardMain, Header } from '../components';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

import '../sass/pages/dashboard.scss'


const Timestamps = () => {

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
    <div className='dashboard-container dashboard-container--timestamps'>
        <Header/>
        <DashboardMain active='timestamps'>
            timestamps
        </DashboardMain>
    </div>
  )
}

export default Timestamps;