import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './Components/Navbar';
import { useState } from 'react';
import AuthContext from './config/context';
import {ToastContainer} from 'react-toastify';
import PrivateRoute from './config/privateroute';
import Register from './pages/register';
import Donate from './pages/donate'
import Dashboard from './pages/Dashboard';
import About from './Components/Dashboard/about';
import Registration from './Components/Dashboard/registration';
import DetailEdit from './Components/Dashboard/edit';
import Dashboard  from './pages/dashboard';
import Home from './pages/home';
import SignUp from './Components/Authenticate/signup';
import SignIn from './Components/Authenticate/signin';

const App =() => {
 const [auth, setAuth] = useState({});

  return(
 <BrowserRouter>
 <AuthContext.Provider value={{auth, setAuth}}>
<Navbar />
   <ToastContainer />
   <Routes>
     <Route element={PrivateRoute}>
       <Route path='/register' element={<Register />} />
       <Route path='/donate' element={<Donate />} />
       <Route path='/dashboard' element={<Dashboard />}>
         <Route path='/dashboard/' element={<About />}/>
         <Route path='/dashboard/registration' element={<Registration />} />
         <Route path='/dashboard/edit' element={<DetailEdit />} />
       </Route>
     </Route>
    <Route path='/' element={<Home />} />
     <Route path='/signin' element={<SignIn />} />
     <Route path='/signup' element={<SignUp />} />
   </Routes>
 </AuthContext.Provider>
 </BrowserRouter>
    
  )
}

export default App;