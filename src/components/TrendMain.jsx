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
        <div className="container trend-topics">
          <h1 className='text-center mt-3'>Trending Topics</h1>
          <h3 className="text-center">Check out what everyone's talking about</h3>
          <div>
           <div className="main-post d-flex align-items-center justify-content-center">
             <div className="mainpost-cover-wrapper mb-3">
              {mainPost ? <img className='mainpost-cover' src={mainPost.coverLink} alt="" /> : ''}
             </div>
             <Link className="post-title text-center text-white text-decoration-none" to={"/articles/trending"}><h2>{mainPost ? mainPost.title : ''}</h2></Link>
             <p>This will eventually be a quick intro sentence to the article. Should be captivating</p>
           </div>

           <div className="news-list-wrapper">
           <h2 className="text-center">Other Trending News</h2>
           <div className="news-list">
              {newsList ?  
                newsList.map((post, index) => 
                  <div key={index} className="d-flex align-items-center">
                    <img src={post.logoLink} className='trend-icons' alt="icon" />
                    <Link className="text-white text-decoration-none" to={"/articles/featured"}>
                     <h5>{post.title}</h5>
                    </Link>
                 
                  </div>
                ): ''}
           </div>
           </div>  
          </div>
        </div> 
       </>
    )
}

export default TrendMain;