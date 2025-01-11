import { useState, useEffect } from 'react';
import axios from 'axios';
import './pageStyles.css';
import Menu from '../Menu';

import XpCircle from '../widgets/XpCircle';

const Learn = () => {

  return (
    <div className="container d-flex justify-content-center" >
      <div>
        <Menu />
      </div>
      <div className='learn-content w-100'>
       <div className="learn-header w-100 d-flex justify-content-center">
         <h1>Learn</h1>
         <XpCircle />
       </div>
       <div className="learn-nav w-100 d-flex">
        <ul className="nav">
          <li className="learn-nav-item">
            <a className="nav-link" href="#">Programs</a>
          </li>
          <li className="learn-nav-item">
            <a className="nav-link" href="#">Roadmaps</a>
          </li>
          <li className="learn-nav-item">
            <a className="nav-link" href="#">Goals</a>
          </li>
          <li className="learn-nav-item">
            <a className="nav-link" href="#">Tools & Frameworks</a>
          </li>
          <li className="learn-nav-item">
            <a className="nav-link" href="#">Settings</a>
          </li>
        </ul>
       </div>
      </div> 
    </div>
  );
};

export default Learn;
