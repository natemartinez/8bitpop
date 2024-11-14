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

    console.log('Featured Posts: ', featurePosts)
    setPosts(featurePosts);
  };

  useEffect(() => {
    getFeatured();
  }, []);


    return(
        <>
         <div className="container feat-topics">
          <p className='feat-title text-center mt-3'>Featured Topics</p>  
          <div className="main-feature-wrapper"> 
           
            <div className='featured-review-wrapper d-flex justify-content-center'>
              {mainReview !== null ? 
                <div className='featured-review'>
                  <h2>{mainReview.title}</h2>
                  <h2>Review Grade</h2>
                </div> : ''}  
            </div>

          <div className='feature-posts d-flex flex-wrap'> 
            {viewportWidth < 700 ? (
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
                     <p className="p-3">{post.title}</p>
                    </a>
                  </div>
                 </div>
              
              ) : ''
            )}
          </div> 
         </div>
        </div> 
        </>
    )
}

export default FeatureMain;