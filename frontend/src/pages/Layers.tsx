import { DashboardMain, Header } from '../components';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

import '../sass/pages/dashboard.scss'


const Layers = () => {

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
        <DashboardMain active='layers'>
            yo
        </DashboardMain>
    </div>
  )
}

export default Layers;