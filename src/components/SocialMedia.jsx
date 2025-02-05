import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import axios from 'axios';


function SocialMedia(){
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [links, setLinks] = useState(false);

  async function fetchImgs() {
    try {
      const response = await axios.get('http://localhost:3001/api/gallery');
      setImages(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  const setImages = (gallery) => {
    const fbLogo = gallery.find(image => image.title === 'fb-logo');
    const igLogo = gallery.find(image => image.title === 'ig-logo');
    const xLogo = gallery.find(image => image.title === 'x-logo');

    setFacebook(fbLogo.link);
    setInstagram(igLogo.link);
    setTwitter(xLogo.link);
    setLinks(true);

  };
 
   useEffect(() => {
     fetchImgs()
   }, []);

    return (
       <div className="container mt-3">
         <div className="sm-div d-flex flex-column">
          <div className="sm-heading">
            <h1>Follow us on Social Media!</h1>
          </div>
          {links ? 
            <div className="d-flex sm-links align-items-center">
             <Link><img src={facebook} alt="Facebook" className='sm-links' /></Link>
             <Link><img src={instagram} alt="Instagram" id='ig-link' className='sm-links'/></Link>
             <Link><img src={twitter} alt="Twitter" className='sm-links'/></Link>   
           </div> : '' }
          
         </div>
          
       </div>
    );
}

export default SocialMedia;