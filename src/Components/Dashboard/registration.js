import {useState, useEffect} from 'react';
import api from '../../config/api';


const Registration = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    api.get(`/users/registrations?email=${sesionStorage.getItem('user_email')}`, {
      headers: {Authorization : localStorage.getItem('acces_token')}
    })
    .then(res => {
      console.log(res.data);
      setRegistrations(res.data.registrations);
    })
    .catch(err => {
      console.log(err.message)
    })
  }, []);

  return(
    <div className='m-3 w-full'>
    <div className='my-4 text-center text-3xl'>
      <span>regsistration</span>
    </div>
      <div className='grid space-y-4'>
        {registrations.map((item, index) => {
      return(
        <div className='p-6 bg-red-100 rounded-xl' key={index}>
        <div className='space-x-4'>
        <span>city</span>
          <span className='text-gray-500'>{item.city}</span>
        </div>
          <div className='space-x-4'>
          <span>date</span>
            <span className='text-gray-500'>{item.date}</span>
          </div>
        </div>
      )
        })}
      </div>
    </div>
  );
}

export default Registration;