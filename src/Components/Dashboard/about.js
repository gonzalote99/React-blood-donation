import {useState, useEffect} from 'react';
import api from '../../config/api';

const About = () => {
  const [personal , setPersonal] = useState({});
  const [address, setAddress] = useState({});

  useEffect(() => {
    api.get(`/user?email=${sessionStorage.getItem('user_email')}/`, {
      headers: {Authorization: localStorage.getItem('access_token')}
    })
    .then(res => {
      console.log(res.data.message);
      setPersonal(res.data.user.personal);
      setAddress(res.data.user.address);
    })
    .catch(err => {
      console.log(err.message);
    })
  }, [])

  const personalList = [
    {
      name: 'Firstname',
      value: personal.firstName,
    },
    {
      name: 'Lastname',
      value: personal.lastName,
    }
  ]

  

  const addressList = [
    { 
    name: 'area',
    value: address.area,
      },
    { 
      name: 'city',
      value: address.city,
        },
  ]

  return(
    <div className='m-2 w-full'>
    <div className='my-4 text-center text-3xl'>
    <span>done</span>
    </div>
      <div className='m-1 px-10 py-4 bg-red-100 rounded-xl text-lg'>
      <div className='text-2xl'>
      <span>portail details</span>
      </div>
        <div className='m-4'>
          {personalList.map((item, index) => {
      return(
        <div className='m-1 space-x-4' key={index}>
          <span>{item.name}</span>
          <span className='text-gray-500'>{item.value}</span>
        </div>
      );
          })}
        </div>
        <div className='m-4'>
          {addressList.map((item, index) => {
         <span className='text-gray-500'>{item.value}</span>
        </div>
        );
          })}
        </div>
      </div>
    </div>
  );
}

export default About;