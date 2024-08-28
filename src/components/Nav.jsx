import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import '../style.css';
import axios from 'axios';

function Nav({ sendPage }) {
  const [isMainActive, setMainActive] = useState(true);
  const [isModernActive, setModernActive] = useState(false);
  const [isRetroActive, setRetroActive] = useState(false);
  const [isFutureActive, setFutureActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(null);

  const changePageBtn = (button) => {
    let newPage = button.target.value;
    sendPage(newPage);

    switch (newPage) {
      case 'Main':
        setMainActive(true);
        setModernActive(false);
        setRetroActive(false);
        setFutureActive(false);
        break;
      case 'Modern':
        setMainActive(false);
        setModernActive(true);
        setRetroActive(false);
        setFutureActive(false);        
        break
      case 'Retro':
        setMainActive(false);
        setModernActive(false);
        setRetroActive(true);
        setFutureActive(false);
        break
      case 'Future':
        setMainActive(false);
        setModernActive(false);
        setRetroActive(false);
        setFutureActive(true);
        break
     default:
        break;
    }

  };

  const MainBtn = ({isActive, isDisabled}) => {
    console.log(isActive);
   // isActive = true;
   // isDisabled = false
    const className = `nav-btns mx-4 ${isActive ? 'active' : ''}${isDisabled ? 'disabled' : ''}`;
    return <Button className={className} onClick={changePageBtn} value="Main" >Main</Button>
  }
  const ModernBtn = ({isActive, isDisabled}) => {
   // isDisabled = false
    const className = `nav-btns mx-4 ${isActive ? 'active' : ''}${isDisabled ? 'disabled' : ''}`;
    return <Button className={className} onClick={changePageBtn} value="Modern" >Modern</Button>
  }
  const RetroBtn = ({isActive, isDisabled}) => {
   // isDisabled = false
    const className = `nav-btns mx-4 ${isActive ? 'active' : ''}${isDisabled ? 'disabled' : ''}`;
    return <Button className={className} onClick={changePageBtn} value="Retro" >Retro</Button>
  }
  const FutureBtn = ({isActive, isDisabled}) => {
   // isDisabled = false
    const className = `nav-btns mx-4 ${isActive ? 'active' : ''}${isDisabled ? 'disabled' : ''}`;
    return <Button className={className} onClick={changePageBtn} value="Future" >Future</Button>
  }

  const checkPage = async(curPage) => {
    console.log(curPage)
  };

 
  // In the future, I should add a setTimeout() before the user can press another button



  return (
    <>
    <div className='container d-flex justify-content-center '>
     <nav className='nav-bar mb-4'>
       <div className='d-flex mb-4 justify-content-center'>
        <h3>LOGO</h3>
        <h2>8BitPop</h2>
       </div>  
        <div className='d-flex nav-btn-divs'>
          <div>
            <MainBtn isActive={isMainActive}></MainBtn>
            <ModernBtn isActive={isModernActive}></ModernBtn>
          </div>
          <div>
            <RetroBtn isActive={isRetroActive}></RetroBtn> 
            <FutureBtn isActive={isFutureActive}></FutureBtn>
          </div>


        </div>
     </nav>
    </div>
   
    </>
  );
}

export default Nav;
