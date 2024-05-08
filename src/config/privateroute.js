import {Navigate, Outlet} from 'react-router-dom';

const PrivateRoute = () => {
  return(
    <>
      {sessionStorage.getItem('user_email') ? <Outlet /> : <Navigate to='/signin' replace={true} />}
    </>
  );
}

export default PrivateRoute;