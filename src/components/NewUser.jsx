import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Register from './Login';
import axios from 'axios';

function NewUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [message, setMessage] = useState('');

  const updateUsername = (event) => {
    let username = event.target.value;
    
    setUsername(username);
    checkUsernames(username);
  };
  const updatePassword = (event) => {
    let password = event.target.value;
    setPassword(password);
  };

  const submitUser = async(username, password, event) => {
    event.preventDefault();

    if(username !== null || password !== null){
      const data = {
        username: username,
        password: password,
        preferences: []
      };  

      try {
         const checkUser = await axios.post('http://localhost:3001/api/users', data);
         console.log(checkUser)
      } catch (error) {
        console.error(error);
      }
    } else{
       setMessage("Must set username and password");
       return
    }
  };

  return(
    <div>
        <h2 className='text-center'>Sign Up</h2>
        <div className='container'>
          <form className=''>
            <div>
              <h2 className='mt-4'>{message}</h2>
            </div>
            <div className='input-form'>
              <div className='info-field-wrapper'>
                <input type="text" placeholder='username' className='info-field mb-1' onChange={updateUsername} />
                <p>{userStatus}</p>
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
