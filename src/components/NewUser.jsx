import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function NewUser() {
  const SERVER = import.meta.env.VITE_SERVER;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const updateUsername = (event) => {
    let username = event.target.value;
    setUsername(username);
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
         const checkUser = await axios.post(SERVER + '/api/register', data);
         setSuccessMessage(`Signup successful!\nWelcome, ${username}!`);
         
         // Clear any previous error messages
         setMessage('');
         
         // Wait 2 seconds then redirect
         setTimeout(() => {
           navigate('/', { state: { userData: data } });
         }, 2000);
       
      } catch (error) {
         if(error.response.status === 400){
            setMessage("User already exists");
            setSuccessMessage('');
         } 
      }
    } else{
       setMessage("Must set username and password");
       setSuccessMessage('');
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
          <div className='d-flex justify-content-center'>
              <h2 className='mt-4 text-success' style={{ whiteSpace: 'pre-line' }}>{successMessage}</h2>
          </div>
          <div className='input-form'>
              <div className='info-field-wrapper'>
                <input type="text" placeholder='username' className='info-field mb-1' onChange={updateUsername} />
              </div>
              <div className='info-field-wrapper' style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder='password' 
                  className='info-field' 
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
              <div><Button type='submit' className='m-5'  onClick={(event) =>  submitUser(username, password, event)}>Submit</Button></div>
              <Link to="/login"><Button>Are you an existing User?</Button></Link>
          </div>               
        </form>
      </div> 
    </div>
  );
}

export default NewUser;
