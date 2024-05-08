import {useEffect, useState} from 'react';
import Personal from '../Register/personal';
import Addres from '../Register/address';
import api from '../../config/api';
import {toast} from 'react-toastify';


const DetailEdit = () => {
  const emptyPersonal = {
    firstName: '',
    lastName: ''
  }
  const emptyAddress = {
    area: '',
    city: ''
  }

  const [personalData, setPersonalData] = useState(emptyPersonal);
  const [addressData, setAddresData] = useState(emptyAddress);

  useEffect(() => {
    api.get(`/user?email${sessionStorage.getItem('user_email')}`, {
      headers: {Authorization: localStorage.getItem('access_token')}
    })
    .then(res => {
      console.log(res.data.message);
        setPersonalData(res.data.user.personal)
        setAddresData(res.data.user.address);
    })
    .catch(err => {
      console.log(err.message)
    })
  }, [])

  const submitHandler = (e) => {
    e.preventDefault();
    api.post('/user/edit', {
      email: sessionStorage.getItem('user_email'),
      personal: personalData,
      address: addressData,
    }, {
      headers : {Authorizaton: localStorage.getItem('access_token')}
    })
    .then(res => {
      toast.success(res.data.message, {
        position: toast.POSTION.TOP_RIGHT
      });
    })
    .catch(err => {
      toast.err(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    })
  }

  return(
    <div className='w-full p-2'>
    <div className='my-4 text-center text-3xl'>
    <span>edit</span>
    </div>
      <form className='m-1 px-10 py-4 bg-red-100 rounded-xl text-lg'onSubit={submitHandler}>
      <Personal personalData={personalData} setPersonalData={setAddresData} />
        <Addres addresData={addressData} setAddresData={setAddresData} />
        <div className='text-center'>
        <button type='submit' className='mt-4 p-2 w-64 bg-read-600 rounded-md' >edit</button>
        </div>
      </form>
    </div>
  );
}

export default DetailEdit;