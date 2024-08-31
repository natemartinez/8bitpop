import { useState, useEffect } from "react";
import { Carousel } from 'react-responsive-carousel';
import { CarouselItem } from 'react-bootstrap';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import axios from "axios";
import Button from "react-bootstrap/Button";
import '../style.css';

function FeatureCarousel(){
  const [posts, setPosts] = useState(null);
  const [mainReview, setMainReview] = useState(null);

  // The API needs to send specific 'featured' data


  async function getFeatured() {
    try {
      const response = await axios.get('http://localhost:3001/api/featured');
      organizeFeatures(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  const organizeFeatures = (features) => {
    let postArr = [];
    for(let i=0; i<features.length;i++){
      let category = features[i].category;
      switch(category){
        case 'Review':
          setMainReview(features[i]);
          break
        case 'Post':
          postArr.push(features[i]);
          break
        default:
          break
      }     
    };
    setPosts(postArr);
  }

  useEffect(() => {
    getFeatured();
  }, []);


    return(
        <>
         <div className="container">
          <div className="main-feature-wrapper"> 
          <h1 className='text-center mt-3'>Featured Topics</h1>
            <div className='featured-review-wrapper d-flex justify-content-center'>
              {mainReview !== null ? 
                <div className='featured-review'>
                  <h2>{mainReview.title}</h2>
                  <h2>Review Grade</h2>
                </div> : ''}  
            </div>


            <Carousel interval={null}>
               {posts !== null ? posts.map((post, index) => 
                  <div key={index} className="feature-card">
                    <h2>Image</h2>
                    <div className="feature-card-link">
                      <a href="#" className="text-white text-decoration-none">
                       <p className="p-3">{post.title}</p>
                      </a>
                      <Button>{post.category}</Button>
                    </div>
                    
                  </div>) : ''}
            </Carousel>
          </div>
        </div> 
        </>
    )
}

export default FeatureCarousel;