import { Carousel, CarouselItem } from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';


function Modern(){
   const SERVER = import.meta.env.VITE_SERVER;
   const [modernVideo, setModernVideo] = useState(null);
   const [modernArtCarousel, setModernArtCarousel] = useState(null);
   const [content, setContent] = useState([]);

   async function fetchContent(){
      try {
        const response = await axios.get(SERVER + '/api/content');
        const modernContent = response.data.filter(obj => obj.page == 'modern');
       console.log('Modern:',modernContent);
        setContent(modernContent);
      } catch (error) {
        console.error(error)
      }
   }

   useEffect(() => {
      fetchContent();
   }, [])


return (
   <div className='modern-content'>             
    <div className='container'>
     <div className='row'>
      {content ? content.map((post, index) =>
        <div key={index} className='modern-card'>
           <div>
            <img className='modern-img' src={post.coverLink} alt="" />
           </div>
           <div className='modern-card-title'>
            <h3>{post.title}</h3>
           </div>      
        </div>
      ): ''}                  
     </div>
     <div className=''>
       <div>
         <p className='modern-long-title'>Games with <strong>cartoon </strong>animations</p>
       </div>
       <div className='art-examples mt-3'>
         
                <Carousel interval={null} className=''>
                {modernArtCarousel !== null ? modernArtCarousel.map((artItem, index) =>  
                    <CarouselItem key={index}>
                        <div className='game-art'>
                          <div>
                            <h2>{artItem.title}</h2>
                          </div>
                          <div className='game-art-img'>
                            <img src={artItem.link} alt={artItem.title} />
                            <div className='game-art-title'>
                               <p>{artItem.title}</p>
                            </div>
                          </div>                    
                        </div>
                    </CarouselItem>): '' }
                </Carousel> 
       </div>
     </div>
     <div className=''>
       <div className='p-3'>
         <p className='modern-title'><strong>Palworld Trailer</strong></p>
       </div>                  
       <div>
         {modernVideo !== null ? 
           <div>
             <iframe className='game-trailer-div' width="560" height="315" src="https://www.youtube.com/embed/uV0zfAwazcs?si=8DwXGEd2LGvdy2Vh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
           </div>
         
         : ''}
       </div>

     </div>
     <div className=''>
       <div>
         <p className='modern-long-title'><strong>VR Indie Game Development</strong></p>
       </div>
       <div className='d-flex'>
        <div>
         <h2>Image Placement</h2>
        </div>
        <div>
         <p>Example text</p>
        </div>                    
       </div>       
     </div>
     <div className=''>
       <div>
       <p className='modern-long-title'><strong>Popular games with unique gameplay</strong></p>
       </div>
       <div className='d-flex'>
        <div>
         <h2>Image Placement</h2>
        </div>
        <div>
         <p>Example text</p>
        </div>                    
       </div>  
     </div>   
    </div>
   </div>
  );
}

export default Modern;