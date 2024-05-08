import AuthContext from '../config/context';
import {useContext, useEffect} from 'react';
import api from '../config/api';
import CountUp from 'react-countup';
import {useState} from 'react';
import ImageSlider from '../Components/Slider';

const Home = () => {
  const {setAuth} = useContext(AuthContext);

  const [registrations, setRegistrations] = useState(0);

  useEffect(() => {
    api.get('/registrations')
    .then(res => {
      setRegistrations(res.data.registrations);
    })
    .catch(err => {
      console.log(err.message);
    } ) 

    api.get('/', {
      headers : {Authorization: localStorage.getItem('access_token')}
    }) 
    .then(res => {
      setAuth({
        token: res.data.access_token,
        isRegistered: res.data.access_token.isRegistered
      })
      sessionStorage.setItem('user_email', res.data.access_token.email);
    })
    .catch(err => {
      console.log(err.message);
    })
  }, [])

  return(
    <div>
    <div>
      <div className='px-12 py-32 text-3xl text-white font-bold bg-red-600'>
      <span>donation</span>
      </div>
    </div>
      <div className='m-4 sm:grid-cols-2'>
      <div className='m-2 text-center'>
      <div className='m-2 text-xl font-bold'>
      <span>about</span>
      </div>
        <div className='m-2 text-md'>
        blood
        </div>
      </div>
        <div className='m-2 text-center'>
        <div className='m-2 text-xl font-bold'>
        <span>registrations</span>
        </div>
          <div className='mx-24 my-4 px-2 py-12 rounded-xl text-6xl font-bold bg-yellow-400'>
          <CountUp
            start={0}
            end={registrations}
            duration={3}
            />
          </div>
        </div>
      </div>
      <div className='m-5 image-center'>
      <div className='m-4 text-xl font-bold'>
      <span>images</span>
      </div>
        <ImageSlider />
      </div>
    </div>
  );
}

export default Home;
