import React from 'react';
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Register from './Register';

function Login() {
  return(
    <div>
        <h2>This is the Login page</h2>
        <Link to="/register"><Button>Register</Button></Link>
    </div>
  );
}

export default Login;
