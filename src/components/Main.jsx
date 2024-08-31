import { useState, useEffect } from 'react';
import '../style.css';
import { Link, useLocation } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { Button, Accordion } from 'react-bootstrap';
import { Carousel, CarouselItem } from 'react-bootstrap';
import axios from 'axios';

import Menu from './Menu';
import Nav from './Nav';
import Featured from './Featured';
import Trend from './Trend';
import SocialMedia from './SocialMedia';
import Review from './Review';

function Main() {
  const [mainPage, setMainPage] = useState(true);
  const [retroPage, setRetroPage] = useState(false);
  const [modernPage, setModernPage] = useState(false);
  const [futurePage, setFuturePage] = useState(false);
  const [loading, setLoading] = useState(false);

  const [chestImg, setChestImg] = useState(null);


  const changePage = (newPage) => {
    setLoading(true);

    switch (newPage) {
      case 'Retro':
        setMainPage(false);
        setRetroPage(true);
        setModernPage(false);
        setFuturePage(false);
        break;
      case 'Modern':
        setMainPage(false);
        setRetroPage(false);
        setModernPage(true);
        setFuturePage(false);
        getModernContent();
        break;
      case 'Future':
        setMainPage(false);
        setRetroPage(false);
        setModernPage(false);
        setFuturePage(true);
        break;
      case 'Main':
        console.log('Heading to Main')
        setMainPage(true);
        setRetroPage(false);
        setModernPage(false);
        setFuturePage(false);
        break;
      default:
        break;
    }

  };

  async function fetchImgs() {
    try {
      const response = await axios.get('http://localhost:3001/api/gallery');
      setImages(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  const setImages = (gallery) => {
   const chest = gallery.find(image => image.title === 'chest');

   setChestImg(chest.link);

  };

  async function getModernContent(){
    try {
      const response = await axios.get('http://localhost:3001/api/modern');
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImgs()
  }, []);



  useEffect(() => {
    if(mainPage){
      setTimeout(() => setLoading(false), [1000]);
    };
  }, [mainPage])
  useEffect(() => {
    if(retroPage){
      setTimeout(() => setLoading(false), [1000]);
    };
  }, [retroPage])
  useEffect(() => {
    if(modernPage){
      setTimeout(() => setLoading(false), [1000]);
    };
  }, [modernPage])
  useEffect(() => {
    if(futurePage){
      setTimeout(() => setLoading(false), [1000]);
    };
  }, [futurePage])

  // Make each retro, modern, and future page needs to be components
 
  return (
    <div>
       <Menu></Menu>
       <div className='container'>
        <Nav sendPage={changePage}></Nav>
        {loading ? <h2>Loading...</h2> :
        <div className='main-content'>
          {retroPage ? 
            <div className='content retroPage'> 
            <div className='mt-4 mb-4'>
              <h2>This is the retro page</h2>
              <div>
                <div>
                  <h2>Retro Game of the Week</h2>
                  <div>
                    <h2>Make a mini-article intro</h2>
                    <p>Should be a headline and description of about 3-4 sentences</p>
                  </div>
                </div>
                
                <div>
                  <h2>Image</h2>
                  <h3>Random Game</h3>
                </div>
                <div>
                  <h2>Similar games list</h2>
                </div>
              </div>

            </div>        
            <div className='retro-feature'>
               <div className='d-flex p-5'>
                 <div className='retro-feature-img border border-primary'>
                  <h3>Image</h3>
                 </div>
                 
                 <div>
                  <h2>Title</h2>
                  <p>This is just an example of the mini description for the article.</p>
                  <p>The description should be intriging.</p>
                  <Button value='Read More'>Read More</Button>
                 </div>
                 
               </div>
               <div></div>
            </div>
            </div> : ''}
          {modernPage ? 
            <div className='content modernPage'>  
              <h2 className='m-5'>This is the modern page</h2>
              <div>
                <div>
                  <h2>Coolest art styles w/ examples of games using that style</h2>
                </div>
                
                <h2>Video that shows behind the scenes content</h2>
                <h2>VR Indie Game Development</h2>
                <h2>Game storytelling elements</h2>
              </div>
            </div> : ''}
          {futurePage ? 
            <div className='content futurePage'>   
              <h2 className='m-5'>This is the future page</h2>
               <div>
                 <h2>Game Dev concept ideas</h2>
               </div>
            </div> : ''}
          {mainPage ? <div>
                       <Trend></Trend>
                       <Featured></Featured>  
                       <div className='indie-spotlight-wrapper'>
                        <h2>Indie Game Spotlight</h2>
                        <div className='indie-spotlight'>
                          <div className='featured-indie-game'>Indie Game Cover</div>
                          <img src={chestImg} alt="chest" className='chest-img' />
                        </div>                
                       </div>
                       <div className='game-releases'>
                         <h2>Game Releases</h2>
                         <h4>This week</h4>
                         <h4>Upcoming</h4>
                       </div>
                       <div className='game-tips-wrapper'>
                        <h2>Game Dev Tips</h2>
                         <Carousel interval={null}>
                            <CarouselItem>
                              <div className='game-tip'>
                                <h2>Intro to Phaser</h2>
                                <Button className='btn-warning'>Beginner</Button>
                              </div>
                            </CarouselItem>
                            <CarouselItem>
                              <div className='game-tip'>
                                <h2>Tools to use if you're not good at art</h2>
                                <Button className='btn-warning'>Beginner</Button>
                              </div>
                            </CarouselItem>
                         </Carousel>
                       </div>
                       <div>
                        <h2>Current Game Jams</h2>
                       </div>
                       <div>
                        <h2>Polls, quizzes, personality tests - Similar to myers-briggs, but with games
                        </h2>
                       </div>
                       <div>
                        <h2>Best soundtracks</h2>
                        <Accordion defaultActiveKey="0" alwaysOpen>
                         <Accordion.Item eventKey="0">
                           <Accordion.Header>Accordion Item #1</Accordion.Header>
                           <Accordion.Body>
                             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                             minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                             aliquip ex ea commodo consequat. Duis aute irure dolor in
                             reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                             pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                             culpa qui officia deserunt mollit anim id est laborum.
                           </Accordion.Body>
                         </Accordion.Item>
                         <Accordion.Item eventKey="1">
                           <Accordion.Header>Accordion Item #2</Accordion.Header>
                           <Accordion.Body>
                             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                             minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                             aliquip ex ea commodo consequat. Duis aute irure dolor in
                             reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                             pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                             culpa qui officia deserunt mollit anim id est laborum.
                           </Accordion.Body>
                         </Accordion.Item>
                        </Accordion>
                       </div>
                    
                      </div> : ''}
        </div> 
       }
    
        <SocialMedia></SocialMedia>      
       </div>

    </div>
  );
}

export default Main;
