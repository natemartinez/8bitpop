import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import ArticleLayout from './ArticleLayout';
import Menu from '../Menu';
import NavMain from '../NavMain';

function TopTen() {
  const location = useLocation();
  const { post } = location.state || {};
  const SERVER = import.meta.env.VITE_SERVER;

  const [loading, setLoading] = useState(true);
  const [coverImg, setCoverImg] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  const handleMenuCollapse = (collapsed) => {
    setIsMenuCollapsed(collapsed);
  };

  useEffect(() => {
    if (post) {
      const htmlContent = post.content.innerHTML;
      setTitle(DOMPurify.sanitize(post.title));
      setContent(DOMPurify.sanitize(post.content));
      setCoverImg(post.coverLink);
      setLoading(false);
    } else {
      console.log("Can't find post, redirecting or showing default content");
      setLoading(false);
    }
  }, [post]);

  return (
    <div>
     <Menu onMenuCollapse={handleMenuCollapse}/>
     <div>
      {!loading && (
        <div className={`container d-flex flex-column justify-content-center article-content ${isMenuCollapsed ? 'menu-collapsed' : ''}`}>   
          <div className='d-flex article-cover-wrapper'>
            {coverImg && <img className='article-cover' src={coverImg} alt="cover" />}
            <h2 id='title'>{title}</h2>
          </div>
          <div id='content' dangerouslySetInnerHTML={{ __html: content }} />
        </div>    
      )}
    </div>
    </div>
  );
}

export default TopTen;
