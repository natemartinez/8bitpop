import { useState, useEffect } from "react";
import { Carousel } from 'react-responsive-carousel';
import { CarouselItem } from 'react-bootstrap';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import axios from "axios";
import Button from "react-bootstrap/Button";
import '../style.css';

function FeatureMain(){
  const [posts, setPosts] = useState(null);
  const [mainReview, setMainReview] = useState(null);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  window.addEventListener('resize', function() {
    let currentWidth = window.innerWidth;
    setViewportWidth(currentWidth);
  });

  async function getFeatured() {
    try {
      const response = await axios.get('http://localhost:3001/api/content');
      organizeFeatures(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  const organizeFeatures = (posts) => {

    let mainPosts = posts.filter(posts => posts.page == 'main');
    let featurePosts = mainPosts.filter(posts => posts.priority == 'low');
    setPosts(featurePosts);
  };

  useEffect(() => {
    getFeatured();
  }, []);


    return(
        <>
         <div className="feat-topics container d-flex">
          <div className="col-2"></div>
          <div className='feature-posts col-8 d-flex flex-wrap'> 
            {viewportWidth < 800 ? (
              <Carousel interval={null}>
                {posts && posts.length > 0 ? posts.map((post, index) => 
                   <div key={index} className="feature-card">
                    <div>
                      <div className="feature-cover-wrapper">
                         <img className="feature-cover" src={post.coverLink} alt="" />    
                      </div>   
                      <a href="#" className="post-title text-white text-decoration-none">              
                       <p className="p-3">{post.title}</p>
                      </a>
                    </div>
                   </div>
                ) : ''}
              </Carousel>
            ) : (
              posts && posts.length > 0 ? posts.map((post, index) =>               
                 <div key={index} className="feature-card col-md-6">
                   <div className="feature-card-content flex-column">
                    <div className="feature-cover-wrapper">
                      <img className="feature-cover" src={post.coverLink} alt="" />
                    </div>
                    <a href="#" className="text-white text-decoration-none">
                     <h3 className="post-title pt-3 pb-5">{post.title}</h3>
                    </a>
                  </div>
                 </div>
              
              ) : ''
            )}
          </div> 
          <div className="col-2"></div>
         </div>
        </>
    )
}

export default FeatureMain;