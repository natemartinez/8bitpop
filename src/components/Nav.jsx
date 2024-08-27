import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import '../style.css';
import axios from 'axios';

function Nav({ sendPage }) {

  const changePageBtn = (button) => {
    let newPage = button.target.value;
    sendPage(newPage)
  };


  return (
    <>
    <div className='container d-flex justify-content-center'>
     <nav className='nav-bar mb-4'>
      <div className='d-flex mb-4 justify-content-center'>
        <Button className='main-btn' value="Main" onClick={changePageBtn}>Back to Main</Button>
        <h3>LOGO</h3>
        <h2>8BitPop</h2>
      </div>    
       <div className='d-flex justify-content-around'>
         <Button onClick={changePageBtn} value="Retro" className='nav-btns mx-4'>Retro</Button>
         <Button onClick={changePageBtn} value="Modern" className='nav-btns mx-4'>Modern</Button>
         <Button onClick={changePageBtn} value="Future" className='nav-btns mx-4'>Future</Button>
       </div>
     </nav>
     </div>
    </>
  );
}

export default Nav;
