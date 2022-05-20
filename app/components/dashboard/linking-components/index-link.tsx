import type { Indicator } from "~/models/theme.server";
import Carousel from 'react-multi-carousel';
import IndicatorSparkline from '../indicator-sparkline';

import { useRef, useEffect, useState } from 'react';


interface LinkProps {
  indicators: Indicator[];
}

export function IndexLink(props: LinkProps){

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };

  const wrapperSize = useRef(null);
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);

  useEffect(() => {
    if (wrapperSize.current){
      let height = wrapperSize.current.parentElement.offsetHeight;
      let width = wrapperSize.current.parentElement.offsetWidth;
      
      setWidth(width);
      setHeight(height);

    }
  }, []);


  const sparkline = {
    height: `${0.8*height}px`,
    width: `${0.25*width}px !important`,
    flex: '0 0 auto !important',
  }

  const carouselWrapper = {
    height: `${height}px`,
    width: `${width}px`,
    flex: '0 0 auto !important',
    
  }

  const carouselTrack = {
    // center the carousel with flex
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',

    alignItems: 'center',
    
  }

  return(
    <div ref = {wrapperSize} style = {carouselWrapper}>
      <Carousel
        
        sliderClass={`${carouselTrack}`}
        partialVisible = {true}
        slidesToSlide = {0}
        itemClass = {`${sparkline}`}

        responsive={responsive}
        swipeable
        >
      {props && props.indicators.map((indicator) => (
        <IndicatorSparkline key={indicator.id} indicator={indicator} style={sparkline}/>
      ))}
      </Carousel>
    </div>
  )
}