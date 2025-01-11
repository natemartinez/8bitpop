import { Carousel, CarouselItem } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import DOMPurify from 'dompurify';

function ModuleForm({title, content, modules}){

    let sanitizedContent = DOMPurify.sanitize(content); 


    return (
       <div>
            <div>
                <h2 id='article-title'>{title}</h2>
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
                <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}>
                </div>
                
            </div>
           
       </div>
    )
   }
   
export default ModuleForm;