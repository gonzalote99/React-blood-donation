import {useState} from 'react';
import api from '../config/api';
import {toast} from 'react-toastify';

const Donate = () => {
  const emptyForm = {
    city: '',
    date: ''
  }

  const formItem = [
    {
      title: 'City',
      name: 'city',
      type: 'text',
      placeholder: 'enter city'
    },
    {
      title: 'Date',
      name: 'date',
      type: 'text',
    
    },
  ]

  const [formData, setFormData] = useState(emptyForm);

  const inputHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    api.post('/donate', {
      ...formData,
      email: sessionStorage.getItem('user_email')
    }, {
      headers: {Authorizaton: localStorage.getItem('acces_token')}
    })
    .then(res => {
      toast.success(res.data.message, {
        position: toast.POSTION.TOP_RIGHT
      });
      setFormData(emptyForm);
      
    })
    .catch(err => {
      toast.error(err.respose.data.message, {
        postion: toast.POSTION.TOP_RIGHT
      });
    })
  }

  return(
    <div className='p-2'>
    <div className='my-2 text-center text-3xl'>
    <span>donate</span>
    </div>
      <form className='my-20 md:mx-96 py-14 text-center bg-red-100 text-lg ronded-xl' onSubmit={submitHandler}>
      <div className='my-4 grid md:grid-cols-2'>
        {formItem.map((item, index) => {
      return(
        <div className='m-2' key={index}>
       <label htmlFor={item.name}>{item.title}</label>
          <input
             type={item.type}
            id={item.name}
            name={item.name}
            placeholder={item.placeholder}
            className='ml-4 p-1 w-64 rounded-md'
            required
            onChange={inputHandler}
            value={formData[item.name]}
            />
        </div>
      )
        })}
      </div>
        <div className='text-center'>
        <button 
          type='submit'
          className='mt-4 p-2 w-72 text-white bg-red-600 rounded-md'>register</button>
          
        </div>
      </form>
    </div>
  );
}

export default Donate;
