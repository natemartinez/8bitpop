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
  const [gameReleases, setGameReleases] = useState(null);

  const [modernVideo, setModernVideo] = useState(null);
  const [modernArtCarousel, setModernArtCarousel] = useState(null);

  const [retroGOTW, setRetroGOTW] = useState(null);
  const [retroPosts, setRetroPosts] = useState(null);
  const [archiveContent, setArchiveContent] = useState(null);
  const [selectedPost, setSelectedPost] = useState('');

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

  async function fetchMedia(page) {
    try {
      const response = await axios.get('http://localhost:3001/api/gallery');
      setMedia(response.data, page)
    } catch (error) {
      console.error(error);
    }
  };
  //receives all content that belongs in main pages
  async function fetchContent(page) {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/content');
      setPageContent(response.data, page);
    } catch (error) {
      console.error(error);
    }
  };
  async function fetchArchives(page) {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/archives');
      console.log('Archives:', response.data);
      setArchiveContent(response.data)
    } catch (error) {
      console.error(error);
    }
  };
  async function fetchReleases() {
    try {
      const releaseInfo = await axios.get('http://localhost:3001/api/releases');
      console.log('Games: ', releaseInfo.data);
      setGameReleases(releaseInfo.data)
    } catch (error) {
      console.error(error)
    }
  };
  async function fetchMechanics() {
    try {
      const releaseInfo = await axios.get('http://localhost:3001/api/mechanics');
      console.log('Mechanics: ', releaseInfo.data);
    } catch (error) {
      console.error(error)
    }
  };

  //receives content to then divide them
  const setPageContent = (content, page) => {
    let curContent = content.filter(item => item.page === page);
    
    if(page == 'main'){
       fetchReleases();
       fetchMechanics();
       setContent(curContent);
    }
    if(page == 'modern'){
      setContent(curContent);
    }
    if(page == 'retro'){
      let gameoftheweek = curContent.filter(item => item.priority == 'high');
      let retroPosts = curContent.filter(item => item.priority == 'medium');
      let archivePosts = curContent.filter(item => item.priority == 'low');
      fetchArchives();
      //returns an array
      setRetroGOTW(gameoftheweek[0]);
      setRetroPosts(retroPosts);
      setArchiveContent(archivePosts);
    };

    setLoading(false);
  };

  const setMedia = (gallery, page) => {

    const pageContents = gallery.filter(content => content.page === page);
    const pageVideo = gallery.filter(content => content.page === page && content.type == 'video');
    const pageArt = gallery.filter(content => content.page === page && content.type == 'photo');

    if(page == 'modern'){
      setModernArtCarousel(pageArt);
      setModernVideo(pageVideo);      
    };


  };

  /*Function for Retro Page */
  const changePosts = () => {
    // This function will look at articles endpoint with a query to what was clicked

  };


  useEffect(() => {
    if(mainPage){
      setTimeout(() => 
          fetchMedia('main'),
          fetchContent('main'), [500]);
    };
  }, [mainPage])
  useEffect(() => {
    if(retroPage){
      setTimeout(() => 
        fetchMedia('retro'),
        fetchContent('retro'), [500]);
    };
  }, [retroPage])
  useEffect(() => {
    if(modernPage){
      setTimeout(() => 
        fetchMedia('modern'),
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
       <div>
        <Nav sendPage={changePage}></Nav>
        {loading ? <h1 className='text-center mt-5'>Loading...</h1> :
        <div className='main-content'>
          {retroPage ? 
            <div className='content retroPage'> 
             <div className='d-flex mt-4 mb-4 '>
             {retroGOTW !== null ?    
              <div className='d-flex flex-column align-items-center'>
                <div className='mb-5 mt-3'>
                    <h3>Retro Game of the Week</h3>
                </div>  
                <div className='d-flex justify-content-center container mt-3'>
                  <div className='col-lg-5'>
                    <img className='retro-gotw' src={retroGOTW.coverLink} alt={retroGOTW.title} />
                  </div>
                  <div className='era-main col-lg-3 mx-5'>
                    <h3 className='text-center'>A look back at:</h3>
                    <p className='retro-gotw-title text-center'>{retroGOTW.title}</p>
                  </div>
                </div>  
    
                <div>
                  <h2>Similar games list</h2>
                </div>
              </div> : '' } 
             </div>     
             {retroPosts !== null ? retroPosts.map((post, index) =>  
                <div className='retro-feature mb-5 d-flex justify-content-center' key={index}>
                  <div className='d-flex flex-row era-posts p-5'>
                    <div className='retro-feature-div border border-primary'>
                      <img className='retro-feature-img' src={post.coverLink} alt="" />
                    </div>
                 
                   <div>
                    <h2>{post.title}</h2>
                    <p>This is just an example of the mini description for the article.</p>
                    <p>The description should be intriging.</p>
                    <Button value='Read More'>Read More</Button>
                   </div>     
                </div>
               <div></div>
                </div>) :  ''}

              <div className='archive d-flex flex-column'>
                <div>
                  <Carousel interval={null}>
                    {archiveContent !== null ? archiveContent.map((post, index) =>
                       <CarouselItem key={index}>
                         <div>
                           <img className='archive-cover' src={post.coverLink} alt="" />
                           <h2>{post.title}</h2>
                         </div>
                       </CarouselItem>) : ''}
                  </Carousel>
                </div>
                <Button onClick={(query) => changePosts(query)}>Select</Button>
              </div>
            </div> : ''}
          {modernPage ? 
            <div className='content modernPage'>             
              <div className='d-flex flex-column align-items-center'>
                <div className='era-main d-flex justify-content-center'>
                 {content ? content.map((post, index) =>
                   <div key={index} className='post-blocks'>
                     <h2>{post.title}</h2>
                   </div>
                 ): ''}                  
                </div>

                <div className='d-flex flex-column align-items-center mt-1 mb-3 era-posts'>
                  <div>
                    <p className='modern-long-title'>Games with <strong>cartoon </strong>animations</p>
                  </div>
                  <div className='art-examples mt-3'>
                    
                           <Carousel interval={null} className=''>
                           {modernArtCarousel !== null ? modernArtCarousel.map((artItem, index) =>  
                               <CarouselItem key={index}>
                                   <div className='game-art'>
                                     <div>
                                       <h2>{artItem.title}</h2>
                                     </div>
                                     <div className='game-art-img'>
                                       <img src={artItem.link} alt={artItem.title} />
                                     </div>                    
                                   </div>
                               </CarouselItem>): '' }
                           </Carousel> 
                  </div>
                </div>
                <div className='d-flex flex-column mt-3 mb-3 era-posts'>
                  <div className='p-3'>
                    <p className='modern-title'><strong>Palworld Trailer</strong></p>
                  </div>                  
                  <div>
                    {modernVideo !== null ? 
                      <div>
                        <iframe className='game-trailer-div' width="560" height="315" src="https://www.youtube.com/embed/uV0zfAwazcs?si=8DwXGEd2LGvdy2Vh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                      </div>
                    
                    : ''}
                  </div>

                </div>
                <div className='d-flex flex-column mt-3 mb-3 era-posts'>
                  <div>
                    <p className='modern-long-title'><strong>VR Indie Game Development</strong></p>
                  </div>
                  <div className='d-flex'>
                   <div>
                    <h2>Image Placement</h2>
                   </div>
                   <div>
                    <p>Example text</p>
                   </div>                    
                  </div>       
                </div>
                <div className='d-flex flex-column mt-3 mb-3 era-posts'>
                  <div>
                  <p className='modern-long-title'><strong>Popular games with unique gameplay</strong></p>
                  </div>
                  <div className='d-flex'>
                   <div>
                    <h2>Image Placement</h2>
                   </div>
                   <div>
                    <p>Example text</p>
                   </div>                    
                  </div>  
                </div>   
              </div>
            </div> : ''}
          {futurePage ? 
            <div className='content futurePage'>   

              <div className='d-flex flex-column align-items-center'>
               <h2 className='m-5'>This is the future page</h2>                
               <div className='era-main'>
                  <div>
                    <h2>Image Placement</h2>
                  </div>
                 <h2>Game Dev concept ideas</h2>
               </div>                
              </div>

            </div> : ''}
          {mainPage ? <div>
                       <TrendMain></TrendMain>
                       <FeaturedMain></FeaturedMain> 
                       <div className='dyk d-flex justify-content-center mt-5 mb-5'>
                        <div className='dyk-box d-flex flex-column'>
                          <h4>Did You Know?</h4>
                          <div className='d-flex flex-row'>
                           <h3>Image</h3>
                           <h3>Did you know</h3>  
                          </div>  
                        </div>
       
                       </div> 
                       <div className='indie-spotlight-wrapper d-flex'>

                        <h2 className='spotlight-header text-center'>Indie Game Spotlight</h2>
                        {spotlight !== null ? spotlight.map((post, index) =>
                          <div key={index} className='indie-spotlight d-flex'>  
                            <div className='featured-indie-game'>
                              <h3 className='m-3'>{post.title}</h3>
                              <img id='indie-game-cover' src={post.coverLink} alt="game cover" />
                            </div>
                            <div>
                              <p>Publisher/Developers: <strong>Mojang</strong></p>
                              <button>Buy on itch.io</button>
                              <button>Buy on Google Play</button>                              
                            </div>
                          </div>): ''}                    
                       </div>
                       <div className='game-releases d-flex flex-column align-items-center'>
                         <h2 className='mt-5 mb-5'>Upcoming Games</h2>
                         <div className='game-releases-list d-flex'>
                          <ul className='d-flex flex-column'>
                            {gameReleases !== null ? 
                              gameReleases.map((element, index) =>
                               <li key={index} className='release-titles mt-4 flex-row d-flex'>
                                {element.cover?.url ? 
                                  (<img className='game-releases-cover' src={element.cover.url} alt="game cover" />) : 
                                  (<img className='game-releases-cover' alt="game cover" />)
                                }
                                <p>{element.name}</p>
                               </li>
                              ) : ''}                  
                          </ul>
                         </div>
                       </div>
                       <div className='game-tips-wrapper d-flex flex-column align-items-center mt-5 mb-5'>
                         <h2 className='text-center mb-5'>Game Dev Tips</h2>
                         <Carousel interval={null} className=''>
                            <CarouselItem>
                              <div className='game-tip'>
                                <div className='game-tip-bkgrd'>
                                  <img src="https://cdn.sanity.io/images/m5zbytnr/production/06c866cd77a4c99192874971889e9faff270a6f2-1920x1080.png" alt="" />
                                </div>
                                
                                <div id='tip-title'>
                                  <Link to='/devtips/phaser-intro' className='tip-title-link'><h2>Intro to Phaser</h2></Link>
                                  <Button className='btn-warning'>Beginner</Button>
                                </div>
                                
                              </div>
                            </CarouselItem>
                            <CarouselItem>
                              <div className='game-tip'>
                                <div className='game-tip-bkgrd'>
                                  <img src="https://cdn.sanity.io/images/m5zbytnr/production/06c866cd77a4c99192874971889e9faff270a6f2-1920x1080.png" alt="" />
                                </div>
                                
                                <div id='tip-title'>
                                  <Link to='/devtips/phaser-intro' className='tip-title-link'><h2>Tools to use when making your game art</h2></Link>
                                  <Button className='btn-warning'>Beginner</Button>
                                </div>
                                
                              </div>
                            </CarouselItem>
                         </Carousel>
                       </div>
                       <div className='mechanic-wrapper d-flex flex-column align-items-center mt-5 p-5'>
                         <h2 className='text-center mb-5'>Deep dive into Game Mechanics</h2>
                        
                         <Accordion defaultActiveKey="0" alwaysOpen className='mech-accordion'>
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
                       <div className='game-jams-wrapper mt-5 mb-5'>
                        <div>
                          <h2 className='text-center mb-5'>Upcoming Game Jams</h2>
                          <div className='d-flex'>
                            <Calendar></Calendar>
                            <div className='game-jams-list'>
                              <ul>
                                <li>
                                  <p className='jam-names'>Game Jam 1</p>
                                </li>
                                <li>
                                  <p className='jam-names'>Game Jam 1</p>
                                </li>
                                <li>
                                  <p className='jam-names'>Game Jam 1</p>
                                </li>
                              </ul>
                            </div>
                          </div>
                          
                        </div>     
                       </div>
                       <div className='mod-news-wrapper mt-5 mb-5'>
                        <div className='mod-news-div mb-4 align-items-center'>
                         <h2 className='text-center mb-5'>Oh My Mod! - Modding News</h2>
                         <Carousel interval={null}>
                            <CarouselItem>
                              <div className='mod-news'>
                                <div>
                                  <h4>Image</h4>
                                </div>
                                <h2>Super Smash Bros. Mod</h2>
                              </div>
                            </CarouselItem>
                            <CarouselItem>
                              <div className='mod-news'>
                                <div>
                                  <h4>Image</h4>
                                </div>
                                <h2>Kingdom Hearts Mod</h2>
                              </div>
                            </CarouselItem>
                         </Carousel>                          
                        </div>
                       </div>
                       <div className='top-ten d-flex align-items-center flex-column mt-4'>
                          <h2 className='mt-5'>Top 10's</h2>
                          <div className='top-ten-modules'>Top 10 redemption arcs in Gaming</div>
                          <div className='top-ten-modules'>Top 10 Debuts for Game Studios</div>
                          <div className='top-ten-modules'>Top 10 redemption arcs in Gaming</div>
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
