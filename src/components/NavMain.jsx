import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import '../style.css';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';

function Nav({ sendPage, isMenuCollapsed, currentUser }) {

  const SERVER = import.meta.env.VITE_SERVER;
  const [logo, setLogo] = useState(null);
  const [isMainActive, setMainActive] = useState(true);
  const [isModernActive, setModernActive] = useState(false);
  const [isRetroActive, setRetroActive] = useState(false);
  const [isFutureActive, setFutureActive] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
 

  window.addEventListener('resize', function() {
    let currentWidth = window.innerWidth;
    setViewportWidth(currentWidth);
  });


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
   // isActive = true;
   // isDisabled = false
    const className = `nav-btns ${isActive ? 'active' : ''}${isDisabled ? 'disabled' : ''}`;
    return <Button className={className} onClick={changePageBtn} value="Main" >Main</Button>
  }
  const ModernBtn = ({isActive, isDisabled}) => {
   // isDisabled = false
    const className = `nav-btns ${isActive ? 'active' : ''}${isDisabled ? 'disabled' : ''}`;
    return <Button className={className} onClick={changePageBtn} value="Modern" >Modern</Button>
  }
  const RetroBtn = ({isActive, isDisabled}) => {
   // isDisabled = false
    const className = `nav-btns ${isActive ? 'active' : ''}${isDisabled ? 'disabled' : ''}`;
    return <Button className={className} onClick={changePageBtn} value="Retro" >Retro</Button>
  }
  const FutureBtn = ({isActive, isDisabled}) => {
   // isDisabled = false
    const className = `nav-btns ${isActive ? 'active' : ''}${isDisabled ? 'disabled' : ''}`;
    return <Button className={className} onClick={changePageBtn} value="Future" >Future</Button>
  }

  async function getLogo(){
    try {
      const response = await axios.get(SERVER + '/api/gallery');
      let images = response.data;
      for(let i=0; i < images.length; i++){
        const logoImg = images.find(img => img.title == 'logo');   
        setLogo(logoImg.link)
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLogo();
  }, []);
 
  // In the future, I should add a setTimeout() before the user can press another button

  return (
    <>
    <div className='container'>
     <nav className={`nav-bar ${isMenuCollapsed ? 'menu-collapsed' : ''}`}>
       <div className='d-flex mb-4 mt-4 justify-content-center align-items-center'>
         {currentUser && <span className='username-display me-3'>Welcome, {currentUser.username}!</span>}
        {logo ? <img id='logo' src={logo} alt="logo" /> : ''} 
         <h1 id='site-name'>8BitPOP</h1>
       </div>  
        <div className='nav-btn-divs'>
          {viewportWidth < 700 ?  
               <Carousel>
                  <div>
                    <MainBtn isActive={isMainActive}></MainBtn>
                    <ModernBtn isActive={isModernActive}></ModernBtn>
                  </div>          
                  <div>
                    <RetroBtn isActive={isRetroActive}></RetroBtn> 
                    <FutureBtn isActive={isFutureActive}></FutureBtn>
                  </div>
               </Carousel> : 
               <div className='default container d-flex justify-content-center'>
                <div className='row'>
                 <div className='col-3'>
                   <MainBtn isActive={isMainActive}></MainBtn>
                 </div>
                 <div className='col-3'>
                   <ModernBtn isActive={isModernActive}></ModernBtn>   
                 </div>
                  <div className='col-3'>
                   <RetroBtn isActive={isRetroActive}></RetroBtn>  
                  </div>      
                 <div className='col-3'> 
                   <FutureBtn isActive={isFutureActive}></FutureBtn>
                 </div>   
                </div>
 
               </div>
               }
          
        </div>
     </nav>
    </div>
   
    </>
  );
}

export default Nav;
