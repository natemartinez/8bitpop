import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function NewUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const updateUsername = (event) => {
    let username = event.target.value;
    setUsername(username);
  };
  const updatePassword = (event) => {
    let password = event.target.value;
    setPassword(password);
  };

  const submitUser = async(username, password, event) => {
    event.preventDefault();

    if(username !== '' || password !== ''){
      const data = {
        username: username,
        password: password,
        progress: {
          current: 0,
        },
        preferences: []
      };  

      try {
         const checkUser = await axios.post('http://localhost:3001/api/register', data);
         navigate('/', { state: { userData: data } });
       
      } catch (error) {
         if(error.response.status === 400){
            setMessage("User already exists");
         } 
      }
    } else{
       setMessage("Must set username and password");
       return
    }
  };

  return(
    <div>
      <div className='container'>
        <h2 className='text-center'>Sign Up</h2>
        <form className=''>
          <div className='d-flex justify-content-center'>
              <h2 className='mt-4'>{message}</h2>
          </div>
          <div className='input-form'>
              <div className='info-field-wrapper'>
                <input type="text" placeholder='username' className='info-field mb-1' onChange={updateUsername} />
              </div>
              <div className='info-field-wrapper'><input type="text" placeholder='password' className='info-field' onChange={updatePassword}/></div>
              <div><Button type='submit' className='m-5'  onClick={(event) =>  submitUser(username, password, event)}>Submit</Button></div>
              <Link to="/login"><Button>Are you an existing User?</Button></Link>
          </div>               
        </form>
      </div> 
    </div>
  );
}

export default NewUser;
