import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';

import axios from 'axios';

function Login() {
  const SERVER = import.meta.env.VITE_SERVER;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitUser = async(username, password, event) => {
    event.preventDefault();

    if(username == '' || password == ''){
      setMessage("Username and password shouldn't be empty");
      return
    }

    const data = {
      username: username,
      password: password,
    };
   
    try {
      const checkUser = await axios.post(SERVER + '/api/login', data);
      if (checkUser.data.message === 'User Exists') {
        setMessage("Welcome!");
        navigate('/', { state: { userData: data } });
      } else {
        setMessage("Invalid credentials.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        setMessage(error.response.data.message || "Something went wrong!");
      } else {
        console.error("Request Error:", error.message);
        setMessage("Unable to connect to the server.");
      }
    }
    
  };


  return(
    <div>
        <h2>Sign in to your profile</h2>
        <div className='mb-5'>
          <h2>{message}</h2>
          <form action="">
           <input type="text" placeholder='username' onChange={updateUsername} />
           <div style={{ position: 'relative', display: 'inline-block' }}>
             <input 
               type={showPassword ? "text" : "password"} 
               placeholder='password' 
               onChange={updatePassword}
               style={{ paddingRight: '40px' }}
             />
             <Button 
               type="button"
               onClick={togglePasswordVisibility}
               style={{ 
                 position: 'absolute', 
                 right: '0', 
                 top: '0', 
                 height: '100%',
                 border: 'none',
                 background: 'transparent',
                 color: '#666',
                 fontSize: '12px'
               }}
             >
               {showPassword ? 'Hide' : 'Show'}
             </Button>
           </div>
           <Button type='submit' onClick={(event) => submitUser(username, password, event)}>Submit</Button>
          </form>
          
        </div>
        <Link to="/new-user"><Button>New User?</Button></Link>
    </div>
  );
}

export default Login;
