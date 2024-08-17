import { Carousel, CarouselItem } from "react-bootstrap";

function TrendCarousel(){

    return(
        <>
        <div className="container">
          <Carousel className="trend-carousel-wrapper" interval={null}>
            <CarouselItem>
              <div className="trend-lineup">
                <div className="article-card">
                  <h2>Trending</h2>
                </div>
                <div className="article-card">
                  <h2>Trending</h2>
                </div>
                <div className="article-card">
                  <h2>Trending</h2>
                </div>
              </div>
              
            </CarouselItem>
            <CarouselItem>
            <div className="trend-lineup">
                <div className="article-card">
                  <h2>Trending</h2>
                </div>
                <div className="article-card">
                  <h2>Trending</h2>
                </div>
                <div className="article-card">
                  <h2>Trending</h2>
                </div>
              </div>
            </CarouselItem>
          </Carousel>
         </div> 
        </>
    )
}

export default TrendCarousel;