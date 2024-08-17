import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import '../styles/style.css';
import axios from 'axios';

function Nav() {

  return (
    <>
    <div className='container d-flex'>

     <nav className='nav-bar'>
      <div className='d-flex mb-4'>
        <h3>LOGO</h3>
        <h2>8BitPop</h2>
      </div>    
       <div className='d-flex justify-content-around'>
         <Button className='nav-btns mx-4'>Retro</Button>
         <Button className='nav-btns mx-4'>Modern</Button>
         <Button className='nav-btns mx-4'>Future</Button>
       </div>
     </nav>
     </div>
    </>
  );
}

export default Nav;
