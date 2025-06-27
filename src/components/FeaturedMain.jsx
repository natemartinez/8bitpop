import { useState, useEffect } from "react";
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import axios from "axios";
import '../style.css';

function FeatureMain() {
  const [posts, setPosts] = useState(null);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const SERVER = import.meta.env.VITE_SERVER;

  window.addEventListener('resize', function() {
    let currentWidth = window.innerWidth;
    setViewportWidth(currentWidth);
  });

  async function getFeatured() {
    try {
      const response = await axios.get(SERVER + '/api/content');
      organizeFeatures(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const organizeFeatures = (posts) => {
    let mainPosts = posts.filter(posts => posts.page === 'main');
    let featurePosts = mainPosts.filter(posts => posts.priority === 'low');
    setPosts(featurePosts);
  };

  useEffect(() => {
    getFeatured();
  }, []);

  return (
    <div className="feat-topics d-flex justify-content-center">
      <h1 className="text-center">Featured Articles</h1>
      <div className='feature-posts justify-content-center row'>
        {viewportWidth < 500 ? (
          <Carousel interval={null}>
            {posts && posts.length > 0 ? posts.map((post, index) =>
              <div key={index} className="col-12 mb-4">
                <div className="feature-card h-100">
                  <div className="slide-content">
                    <div className="feature-cover-wrapper">
                      <img className="feature-cover img-fluid" src={post.coverLink} alt="" />
                    </div>
                    <a href="" className="post-title text-white text-decoration-none">
                      <h3 className="p-3">{post.title}</h3>
                    </a>
                  </div>
                </div>
              </div>
            ) : ''}
          </Carousel>
        ) : (
          posts && posts.length > 0 ? posts.map((post, index) =>
            <div key={index} className="d-flex justify-content-center col-md-4 col-sm-12 mb-4">
              <div className="feature-card h-100">
                <div className="feature-card-content d-flex flex-column align-items-center">
                  <div className="feature-cover-wrapper">
                    <img className="feature-cover img-fluid" src={post.coverLink} alt="" />
                  </div>
                  <Link className="post-title text-white text-decoration-none" state={{post: post}} to={'/articles/featured'}>
                    <h3 className="p-3 text-center">{post.title}</h3>
                  </Link>
                </div>
              </div>
            </div>
          ) : ''
        )}
      </div>
    </div>
  );
}

export default FeatureMain;