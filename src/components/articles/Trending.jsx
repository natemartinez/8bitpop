import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import '../../style.css';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { Carousel, CarouselItem } from 'react-bootstrap';
import Menu from '../Menu';
import SocialMedia from '../SocialMedia';


function Trending() {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [nextArticles, setNextArticles] = useState([]);
  const [nextArticlesLoaded, setNextArticlesLoaded] = useState(false);


  async function fetchArticle() {
    const articles = await axios.get('http://localhost:3001/api/content');
    let curArticle = articles.data[0];

    setCoverImg('https://cdn.sanity.io/images/m5zbytnr/production/7e8014ad85ebae1fae3117ac9bdd07b15715ee60-1920x1370.jpg');

    let sanitizedTitle = DOMPurify.sanitize(curArticle.title);
    let sanitizedTOB = DOMPurify.sanitize(curArticle.tob);
    let sanitizedContent = DOMPurify.sanitize(curArticle.content);
  
    document.getElementById('title').innerHTML = sanitizedTitle;
    document.getElementById('tob').innerHTML = sanitizedTOB;
    document.getElementById('content').innerHTML = sanitizedContent;

    fetchNextArticles(articles);
    
  };

  async function fetchNextArticles(articles) {
    let articleData = articles.data;
    let articleArr = [];

    // this loop needs to make sure that it's not the same as the rest
    // maybe to be extra sure, I should show the featured when on a trend article, and vice versa

    for(let i = 0; i < articleData.length; i++){
      let curClass = articleData[i].class;
      console.log(curClass);
      if(curClass == 'feature'){
        articleArr.push(articles[i]);
      }
    }

    setNextArticles(articleArr);
    setNextArticlesLoaded(true)
    
  };

  useEffect(() => {
    fetchArticle();
  }, [])


  return (
    <>
    <div>
      <Menu></Menu>
      <div>
        <Button><Link className='text-white text-decoration-none' to={"/"}>Home</Link></Button>      
      </div>
     {!loading ? '' :
     <div> 
      <div className='container d-flex justify-content-center'>
       <div className='article-cover-wrapper'>
         {!coverImg ? '' : <img className='article-cover' src={coverImg} alt="steam" />}
       </div>
       <h2 id='title'></h2>
      </div>
      <div className='container'>
       <div id='tob'></div>
       <div id='content'></div>
       <div className='next-articles'>
        <Carousel interval={null}>
        {nextArticlesLoaded ? nextArticles.map((post, index)  => 
          <CarouselItem key={index}>
           <div className='game-tip'>
            <h2></h2>
            <Button className='btn-warning'>Beginner</Button>
           </div>
          </CarouselItem>

        ) : ''}  
        </Carousel>
       </div>
       <div id='comment-field'>
          <h2>COMMENT SECTION</h2>
       </div>
      </div>
     </div> 
     }
     <SocialMedia></SocialMedia>
     </div>
    </>
  );
}

export default Trending;

