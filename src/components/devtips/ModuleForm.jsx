import { Carousel, CarouselItem } from 'react-bootstrap';
//This component will organize all dev tip content

function ModuleForm({title, content, modules}){

    // first test with practice text

    return (
       <div>
            <div>
                <h2>{title}</h2>
            </div>
            <div className="module-menu-wrapper">
                <Carousel>
                 <CarouselItem>
                  <div className="module-menu-elements">Module Examples</div>
                  <div className="module-menu-elements">Module Examples</div>
                  <div className="module-menu-elements">Module Examples</div>   
                 </CarouselItem>
                </Carousel>

            </div>
            
            <div className="d-flex game-tip-content">
                <div className="game-tip-tob">
                    <h2>Table of Contents</h2>
                </div>
                <h2>{content}</h2>
            </div>
           
       </div>
    )
   }
   
export default ModuleForm;