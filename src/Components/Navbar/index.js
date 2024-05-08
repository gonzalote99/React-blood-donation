import {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {List, X} from 'react-bootsrap-icons';
import {toast} from 'react-toastify';
import AuthContext from '../../config/context';

const Navbar = () => {
  const user = sessionStorage.getItem('user_email');
  const {auth} = useContext(AuthContext);
  const [menuState, setMenuState] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    menuState ? setMenuState(false) : setMenuState(true);
  }

  const navList = [
    {
      name: 'Donate',
      path: auth.isRegistered ? '/donate' : '/register'
    },
    {
      name: 'user',
      path: auth.isRegistered ? '/dashboard' : '/'
    }
  ]
  console.log(auth);

  const logout = () => {
    localStorage.removeItem('access_token');
    sessionStorage.removeItem('user_email');
    toast.success('logout', {
      position : toast.POSITION.TOP_RIGHT
    })
    navigate('/',)
  }

  return(
    <div className='p-4 bg-red-600 text-white'>
    <div className='flex justift-between'>
    <div className='text-xl'>
    <span>blood donation</span>
    </div>
      <div className='sm:block space-x-4 hidden'>
      <Link to='/'>Home</Link>
        {user ? navList.map((item, index) => {
          return (
            <Link
              to={item.path}
              key={index}
              > {item.name}</Link>
          )
        }) : <Link to='/signin'>sign in</Link>}
        {user && <button onClick={logout}>logout</button>}
        
        
      </div>
      {menuState && <div className='text-center sm:hidden'>
      <div className='p-2'>
      <Link to='/' onClick={toggleMenu}>home</Link>
      </div>
        {user ? navList.map((item, index) => {
      return(
        <div className='p-2' key={index}>
         <Link
             to={item.path}
            onClick={toggleMenu}
           >{item.name}</Link>
        </div>
      )
        }) : 
        <div className='p-2' onClick={toggleMenu}>
        <Link to='/signin'>sign in</Link>
        </div>
        }
        {user && <div className='p-2'>
        <Link onClick={logout}>logout</Link>
        </div>}
      </div>}
    </div>
    </div>
  );
}

export default Navbar;