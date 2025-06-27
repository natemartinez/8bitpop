import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import './ArticleCarousel.css';

const ArticleCarousel = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const SERVER = import.meta.env.VITE_SERVER;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${SERVER}/api/posts`);
        setArticles(response.data.slice(0, 5)); // Get first 5 articles for carousel
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, [SERVER]);

  if (loading) {
    return (
      <div className="carousel-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="article-carousel-container">
      <h3 className="carousel-title">Featured Articles</h3>
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        stopOnHover={true}
        swipeable={true}
        emulateTouch={true}
        className="article-carousel"
      >
        {articles.map((article, index) => (
          <div key={article._id || index} className="carousel-slide">
            <div className="slide-content">
              {article.coverLink && (
                <img 
                  src={article.coverLink} 
                  alt={article.title || 'Article cover'} 
                  className="slide-image"
                />
              )}
              <div className="slide-overlay">
                <h4 className="slide-title">{article.title || 'Untitled Article'}</h4>
                <p className="slide-excerpt">
                  {article.content 
                    ? article.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
                    : 'No content available'
                  }
                </p>
                <button className="btn btn-primary read-more-btn">
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ArticleCarousel;



