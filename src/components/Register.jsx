import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Login from './Login';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const updateUsername = (event) => {
    let username = event.target.value;
    setUsername(username);

   // console.log('Username: ', username);
   // console.log('Password: ', password);
  };

  const updatePassword = (event) => {
    let password = event.target.value;
    setPassword(password);
  };

  const submitUser = async(username, password) => {
    
    const data = {
      username: username,
      password: password
    };
   
    try {
      const checkUser = await axios.post('http://localhost:3001/api/add-user', data);
      console.log(checkUser.data);
    } catch (error) {
      console.error(error);
    }
  };


  return(
    <div>
        <h2>This is the Register page</h2>
        <div className='mb-5'>
          <input type="text" placeholder='username' onChange={updateUsername} />
          <input type="text" placeholder='password' onChange={updatePassword}/>
          <Button type='submit' onClick={() => submitUser(username, password)}>Submit</Button>
        </div>
        <Link to="/login"><Button>Login</Button></Link>
    </div>
  );
}

export default Register;
