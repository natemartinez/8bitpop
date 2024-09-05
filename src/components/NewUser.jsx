import React from 'react';
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Register from './Login';

function NewUser() {
  return(
    <div>
        <h2>This is the Login page</h2>
        <Link to="/register"><Button>Existing User?</Button></Link>
    </div>
  );
}

export default NewUser;
