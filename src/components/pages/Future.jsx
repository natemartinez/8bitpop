import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import {Button} from "react-bootstrap";
import axios from 'axios'

const Future = () => {

  const SERVER = import.meta.env.VITE_SERVER;
  const [content, setContent] = useState([]);

  async function fetchContent(){
    try {
      const response = await axios.get(SERVER + '/api/content');
      const modernContent = response.data.filter(obj => obj.page == 'future');
     // console.log(modernContent);
      setContent(modernContent);
    } catch (error) {
      console.error(error)
    }
 }

 useEffect(() => {
    fetchContent();
 }, [content])
  

  return (
    <div className='content futurePage'>   

    <div className='d-flex flex-column align-items-center'>
     <h2 className='m-5'>This is the future page</h2>                
     <div className='era-main'>
        <div>
          <h2>Image Placement</h2>
        </div>
       <h2>Game Dev concept ideas</h2>
     </div>                
    </div>

  </div>
  );
};

export default Future;
