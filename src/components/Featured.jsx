import { useState, useEffect } from "react";
import { Carousel } from 'react-responsive-carousel';
import { CarouselItem } from 'react-bootstrap';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import axios from "axios";
import Button from "react-bootstrap/Button";
import '../style.css';

function FeatureCarousel(){
  const [posts, setPosts] = useState(null);

  // The API needs to send specific 'featured' data


  async function getFeatured() {
    try {
      const response = await axios.get('http://localhost:3001/api/featured');
      setPosts(response.data);
  
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    getFeatured();
  }, []);

  // Have each feature card have a fi

    return(
        <>
         <div className="container">
          <div className="main-feature-wrapper">   
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
                    
                  </div>) : ''
                }
            </Carousel>
          </div>
        </div> 
        </>
    )
}

export default FeatureCarousel;