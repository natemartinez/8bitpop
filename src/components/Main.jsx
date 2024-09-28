import { useState, useEffect } from 'react';
import '../style.css';
import { Link, useLocation } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { Button, Accordion } from 'react-bootstrap';
import { Carousel, CarouselItem } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

import Menu from './Menu';
import Nav from './NavMain';
import FeaturedMain from './FeaturedMain';
import TrendMain from './TrendMain';
import SocialMedia from './SocialMedia';
import Review from './Review';
import Calendar from './Calendar';

function Main() {
  const [mainPage, setMainPage] = useState(true);
  const [retroPage, setRetroPage] = useState(false);
  const [modernPage, setModernPage] = useState(false);
  const [futurePage, setFuturePage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spotlight, setSpotlight] = useState(null);
  const [content, setContent] = useState(null);
  const [chestImg, setChestImg] = useState(null);

 // const location = useLocation();

 // const userData = location.state?.userData;

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
  //receives all content that belongs in main pages
  async function fetchContent(page) {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/content');
      getPageContent(response.data, page);
      fetchReleases();
    } catch (error) {
      console.error(error);
    }
  };

  async function fetchReleases() {
    try {
      const releaseInfo = await axios.get('http://localhost:3001/api/releases');
      console.log(releaseInfo)
    } catch (error) {
      console.error(error)
    }
  };

  //receives content to then divide them
  const getPageContent = (content, page) => {

    let curContent = [];
    let spotlightContent = [];

     for(let i = 0; i < content.length; i++){
       if(content[i].page == page){
         if(content[i].class == 'spotlight'){
           spotlightContent.push(content[i]);
         }else{
           curContent.push(content[i]);
         } 
       }   
     };
    
     setContent(curContent);
     setSpotlight(spotlightContent);
     setLoading(false);
  };
  const setImages = (gallery) => {
   const chest = gallery.find(image => image.title === 'chest');

   setChestImg(chest.link);

  };


  useEffect(() => {
    fetchImgs();
  }, []);
  useEffect(() => {
    if(mainPage){
      setTimeout(() => fetchContent('main'), [500]);
    };
  }, [mainPage])
  useEffect(() => {
    if(retroPage){
      setTimeout(() => fetchContent('retro'), [500]);
    };
  }, [retroPage])
  useEffect(() => {
    if(modernPage){
      setTimeout(() => 
        fetchContent('modern'),
      [500]);
    };
  }, [modernPage])
  useEffect(() => {
    if(futurePage){
      setTimeout(() => fetchContent('future'), [500]);
    };
  }, [futurePage])



  // Make each retro, modern, and future page needs to be components
 
  return (
    <div>
       <Menu></Menu>
       <div className='container'>
        <Nav sendPage={changePage}></Nav>
        {loading ? <h1 className='text-center mt-5'>Loading...</h1> :
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
                {content ? content.map((post, index) =>
                  <div key={index} className='post-blocks'>
                    <h2>{post.title}</h2>
                  </div>
                ): ''}
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
                       <TrendMain></TrendMain>
                       <FeaturedMain></FeaturedMain> 
                       <div className='dyk'>
                        <h2>Did You Know?</h2>
                        <div className='d-flex flex-row'>
                         <h1>Image</h1>
                         <h3>Did you know</h3>  
                        </div>         
                       </div> 
                       <div className='indie-spotlight-wrapper'>
                        <h1 className='spotlight-header text-center'>Indie Game Spotlight</h1>
                        {spotlight !== null ? spotlight.map((post, index) =>
                          <div key={index} className='indie-spotlight'>
                            <h2 className='m-3'>{post.title}</h2>
                            <div className='featured-indie-game'>
                              <img id='indie-game-cover' src={post.coverLink} alt="game cover" />
                            </div>
                            <p>Publisher/Developers: <strong>Mojang</strong></p>
                            <img src={chestImg} alt="chest" className='chest-img' />
                          </div>): ''}                    
                       </div>
                       <div className='game-releases m-5 '>
                         <h2>Game Releases</h2>
                         <div className='game-releases-ps5'>
                          <h4>PlayStation 5</h4>
                         </div>
                         <div className='game-releases-xbox'>
                          <h4>Xbox Series X/S</h4>
                         </div>
                         <div className='game-releases-pc'>
                          <h4>PC</h4>
                         </div>
                       </div>
                       <div className='game-tips-wrapper m-5'>
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
                       <div className='game-jams-wrapper mt-5'>
                        <div>
                          <h2 className='text-center'>Upcoming Game Jams</h2>
                          <Calendar></Calendar>
                        </div>     
                       </div>

                       <div className='mechanic-wrapper'>
                        <h2>Deep dive into Game Mechanics</h2>
                        {}
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

                       <div className='mod-news'>
                        <h2>Oh My Mod! - Modding News</h2>
                       </div>

                       <div>
                          <h2>Top 10's</h2>
                       </div>
                      </div> : ''}

         <SocialMedia></SocialMedia>    
                  
        </div> 
       }            
       </div>
        
    </div>
  );
}

export default Main;
