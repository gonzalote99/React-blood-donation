import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import api from '../../config/api';
import {toast} from 'react-toastify';

const SignUp = () => {
  const formEmpty = {
    email: '',
    passowrd: ''
  }

  const [formData, setFormData] = useState(formEmpty);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    api.post('/register', formData )
    .then(res => {
      toast.succes(res.data.message, {
        position: toast.POSITION.TOP_RIGHT
      })
      setFormData(formEmpty);
      navigate('/signin', {replace: true})
    })
    .catch(err => {
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT
      })
    })
  }

  return (
    <div>
    <div className='my-14 md:mx-96 py-14 text-center bg-red-100 text-lg rounded-xl'>
    <div className='m-2 text-2xl'>
    <span>sign up</span>
    </div>
      <form onSubmit={submitHandler}>
       <div className='mt-4'>
       <input
         type='email'
         name='email'
         value={formData.email}
         onChange={inputHandler}
         placeholder='email'
         className='w-80 p-2 rounded-md'
         />
       </div>
        <div className='mt-4'>
        <input
          type='password'
          name='password'
          value={formData.passowrd}
          onChange={inputHandler}
          placeholder='passwowrd'
          className='w-80 p-2 rounded-md'
          />
        </div>
        <button type='submit' className='my-4 p-2 w-80 text-white bg-red-600 rounded-md'>sign up</button>
        <div>
        <span>count?</span>
          <Link to='/signin'>sign in</Link>
        </div>
      </form>
    </div>
    </div>
  )
}

export default SignUp;