import * as React from 'react'

export const ScuffedCarousel = () => {

  React.useEffect(() => {
    let sliderInterval: any;
    let loadInterval: any;

    loadInterval = setInterval(() => {

      const slidesContainer = document.getElementById("slides-container");
      const slide = document.querySelector(".slide");

      let slidesCount = (document.getElementById("slides-container")?.children.length || 0)*1;
      let moveDir = 1;

      const slideWidth = ((slide?.clientWidth) || 0)/1;
      const containerWidth = slidesContainer?.clientWidth || 0;

      if (slidesContainer) {
        slidesContainer.scrollLeft = 0;
      }

      if (slideWidth) {
        
        if (loadInterval) {
          clearInterval(loadInterval);
        }
        
        sliderInterval = setInterval(() => {
          if (slidesContainer) {
            slidesContainer.scrollLeft += slideWidth * (moveDir);

            if (moveDir > 0) {
              // if slide reached end
              if (slidesContainer.scrollLeft + containerWidth > (slidesCount) * slideWidth - 20) {
                moveDir *= -1;
              }
              /* else {
                console.log(moveDir, containerWidth, slideWidth, slidesContainer.scrollLeft + "", Math.round(slidesContainer.scrollLeft/slideWidth)*slideWidth);
                slidesContainer.scrollLeft = Math.round(slidesContainer.scrollLeft/slideWidth)*slideWidth;
              } */
            }
            else {
              // if slide reached back to start
              if (slidesContainer.scrollLeft <= 20) {
                moveDir *= -1;
              }
            }
            //console.log(moveDir, containerWidth, slideWidth, slidesContainer.scrollLeft + "");
          }

        }, 5000);
      }

    }, 2000);

    return function cleanup() {
      if (sliderInterval) {
        clearInterval(sliderInterval);
      }
      if (loadInterval) {
        clearInterval(loadInterval);
      }
    };
  }, []);

  return <div>
    <div className="gen-container center-insides">
      <section className="slider-wrapper">
        <ul className="slides-container" id="slides-container">
          <li className="slide"><img src="preview_fems/1.png"></img></li>
          <li className="slide"><img src="preview_fems/2.png"></img></li>
          <li className="slide"><img src="preview_fems/3.png"></img></li>
          <li className="slide"><img src="preview_fems/4.png"></img></li>
          <li className="slide"><img src="preview_fems/5.png"></img></li>
          <li className="slide"><img src="preview_fems/6.png"></img></li>
          <li className="slide"><img src="preview_fems/7.png"></img></li>
          <li className="slide"><img src="preview_fems/8.png"></img></li>
          <li className="slide"><img src="preview_fems/9.png"></img></li>
          <li className="slide"><img src="preview_fems/10.png"></img></li>
          <li className="slide"><img src="preview_fems/11.png"></img></li>
          <li className="slide"><img src="preview_fems/12.png"></img></li>
          <li className="slide"><img src="preview_fems/13.png"></img></li>
          <li className="slide"><img src="preview_fems/14.png"></img></li>
          <li className="slide"><img src="preview_fems/15.png"></img></li>
          <li className="slide"><img src="preview_fems/16.png"></img></li>
          <li className="slide"><img src="preview_fems/17.png"></img></li>
          <li className="slide"><img src="preview_fems/18.png"></img></li>
          <li className="slide"><img src="preview_fems/19.png"></img></li>
          <li className="slide"><img src="preview_fems/20.png"></img></li>
        </ul>
      </section>
    </div>
  </div>
}