import { Carousel } from '@trendyol-js/react-carousel';
import { CarouselItem } from 'react-bootstrap';


function FeatureCarousel(){

    return(
        <>
         <div className='container'>
           <Carousel show={2.5} slide={3} swiping={true} className="feature-carousel-wrapper">
             <div className="article-card">
               <h2>Featured</h2>
             </div>
             <div className="article-card">
               <h2>Featured</h2>
             </div>
             <div className="article-card">
               <h2>Featured</h2>
             </div>
           </Carousel>
          </div>
        </>
    )
}

export default FeatureCarousel;