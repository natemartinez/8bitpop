import {useState, useEffect} from 'react';
import axios from 'axios';

import Menu from '../Menu'

const Community = () => {

  return (
    <div className="container">
        <div>
           <Menu /> 
        </div>
        <div>
            <h2>Build a job board</h2>
            <h2>Build a help page strictly for inspiration - like deviantArt</h2>
        </div>
      
    </div>
  );
};

export default Community;
