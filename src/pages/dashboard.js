import {Outlet} from 'react-router-dom';
import Sidebar from '../Components/Dashboard/sidebar';

const Dashboard = () => {
  return(
    <div className='min-h-screen flex'>
    <Sidebar />
      <Outlet />
    </div>
  )
}

export default Dashboard;