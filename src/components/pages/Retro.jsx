import { useState, useEffect } from "react";
import axios from 'axios';
import Carousel from "react-multi-carousel";
import {Button} from "react-bootstrap";
import { connect } from "react-redux";

const Retro = () => {
    const SERVER = import.meta.env.VITE_SERVER;
    const accessToken = import.meta.env.IGDB_TOKEN;
    const accessID = import.meta.env.IGDB_ID;

    const [retroGOTW, setRetroGOTW] = useState(null);
    const [retroPosts, setRetroPosts] = useState([]);
    const [archiveContent, setArchiveContent] = useState(null);

    const [similarGames, setSimilarGames] = useState([]);

    async function fetchContent(){
      try {
        const response = await axios.get(SERVER + '/api/content');
        const retroContent = response.data.filter(obj => obj.page == 'retro');
        console.log('Retro Content: ', retroContent);
        sortContent(retroContent);
      } catch (error) {
        console.error(error)
      }
    };
    function sortContent(content){
      let posts = [];

      for(let i=0; i < content.length; i++){
        if(content[i].priority == 'high'){
           setRetroGOTW(content[i]);
        } else if(content[i].priority == 'medium'){
          posts.push(content[i]);
        } else{
          // archives
        }
      }
      setRetroPosts(posts);
    };
 
    async function fetchGameData(){
      try {
         const serverData = await axios.get(SERVER + '/api/gameData');
         const gameArray = serverData.data.similarGames;
         console.log('Similar Games: ', gameArray);
         setSimilarGames(gameArray);
      } catch (error) {
        console.error(error);
      }
    };
 
    useEffect(() => {
      fetchContent();
      fetchGameData();
    }, [])

   /* SIMILAR GAMES: 
     - I want to make each similar game into a carousel
     - I want to make either the loading time is faster or 
     make a 'loading screen'
   */

  return (
    <div className="container d-flex justify-content-center" >
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
                  {similarGames !== null ? similarGames.map((game, index) => 
                    <li key={index}>
                        {game}
                    </li>
                   ) : ''}
                </div>
              </div> : '' } 
             </div>     
             {retroPosts !== null ? retroPosts.map((post, index) =>  
                <div className='retro-feature mb-5 d-flex justify-content-center' key={index}>
                  <div className='d-flex flex-row era-posts p-5'>
                    <div className='retro-feature-div'>
                      <img className='retro-feature-img' src={post.coverLink} alt="" />
                    </div>                 
                   <div className='p-3'>
                    <h2>{post.title}</h2>
                    <p>This is just an example of the mini description for the article.</p>
                    <p>The description should be intriging.</p>
                    <Button value='Read More'>Read More</Button>
                   </div>     
                </div>
               <div></div>
                </div>) :  ''}
        </div>
    </div>
  );
};

export default Retro;
