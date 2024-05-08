import {useState, useContext} from 'react';
import Address from '../Components/Register/address';
import Personal from '../Components/Register/personal';
import api from '../config/api';
import {toast} from 'react-toast';
import AuthContext from '../config/context';
import {useNavigate} from 'react-router-dom';


const Register = () => {
  const emptyPersonal = {
    firstname: '',
    lastname: ''
  }

  const emptyAddres = {
    area: '',
    city: ''
  }

  const [personalData, setPersonalData] = useState(emptyPersonal);
  const [addressData, setAddresData] = useState(emptyAddres)
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();


  const submitHandler = (e) => {
    e.preventDefault();
    api.post('/register', {
      email: sessionStorage.getItem('user_email'),
      personal: personalData,
      address: addressData
    }, {
      headers: {Authorization: localStorage.getItem('access_token') }
    })
    .then(res => {
      toast.success(res.data.message, {
        positon: toast.POSITION.TOP_RIGHT
      });
      setPersonalData(emptyPersonal);
      setAddresData(emptyAddres);
      setAuth({
        ...auth,
        isRegistered: true
      })
      navigate('/donate', {replace: true})
    })
    .catch(err => {
      toast.err(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    })
  }

  return (
    <div className='p-2'>
    <div className='my-4 text-center text-3xl'>
    <span>registration</span>
    </div>
      <form className='m-1 px-10 py-4 bg-red-100 rounded-xl' onSubmit={submitHandler}>
       <Personal personalData={personalData} setPersonalData={setPersonalData} />
        <Address addresData={addressData} setAddresData={setAddresData} />
        <div className='text-center'>
        <button type='submit' className='mt-4 p-2 w-64 text-white bg-read-600 rounded-md'>register</button>
          
        </div>
      </form>
    </div>
  )
}

export default Register;