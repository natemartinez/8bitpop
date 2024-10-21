import { useState, useEffect } from "react";
import { Carousel, CarouselItem } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import axios from "axios";

function TrendMain(){
    const [posts, setPosts] = useState(null);
    const [mainPost, setMainPost] = useState(null);
    const [mainPostCover, setMainPostCover] = useState(null);
    const [newsList, setNewsList] = useState(null);

    async function getTrends() {
      try {
        const response = await axios.get('http://localhost:3001/api/content');
        organizePosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    async function organizePosts(posts) {
  
      let trends = [];

       for(let i=0; i < posts.length; i++){
        let postClass = posts[i].class;
        let postPriority = posts[i].priority;
         if(postClass == 'trending' && postPriority == 'high' ){
           setMainPost(posts[i]);
         };
         if(postClass == 'trending' && postPriority == 'medium'){
          trends.push(posts[i]);
         };
       };

       setNewsList(trends);

    }

    useEffect(() => {
      getTrends();    
    }, []);


    return(
       <>
        <div className="trend-topic-wrapper">
         <div className="trend-topics">
          <div>
            <h3 className='trend-title text-center mt-3'>Trending Topics</h3>
            <h3 className="text-center">Check out what everyone's talking about</h3>            
          </div>
          <div className="main-post-wrapper">
            <div>
             <div className="main-post d-flex justify-content-center">
              <div className="mainpost-cover-wrapper mb-3">
               {mainPost ? <img className='mainpost-cover' src={mainPost.coverLink} alt="" /> : ''}
              </div>
              <div className="mainpost-desc">
               <Link className="post-title text-center text-white text-decoration-none" to={"/articles/trending"} >
               <h3 className="pt-3 pb-3">{mainPost ? mainPost.title : ''}</h3>
               </Link>
               <p>
                This will eventually be a quick intro sentence to the article. 
                <br/>
                Should be captivating
               </p>              
             </div>

             </div>              
            </div>
            <div className="news-list-wrapper pt-3 pb-3">
             <h2 className="text-center other-trend-title mt-3">Other Trending News</h2>
              <div className="news-list">
               {newsList ?  
                newsList.map((post, index) => 
                  <div key={index} className="d-flex align-items-center">
                    <img src={post.logoLink} className='trend-icons' alt="icon" />
                    <Link className="text-white text-decoration-none" to={"/articles/featured"}>
                     <p className="news-list-items">{post.title}</p>
                    </Link>        
                  </div>
                ): ''}
              </div>
            </div>  
          </div>
         </div>          
        </div>
 
       </>
    )
}

export default TrendMain;