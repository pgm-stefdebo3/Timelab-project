import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';


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
    <>
    You are logged in!
    </>
  )
}

export default Dashboard;