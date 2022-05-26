import { IndicatorBox } from "~/components/dashboard/linking-components/IndicatorBox"
import type { Indicator } from "~/models/theme.server";
import Carousel from 'react-multi-carousel';
import type { UserType } from "~/models/user.server";

import { useRef, useEffect, useState } from 'react';


interface LinkProps {
  indicators: Indicator[];
  evaluateIndicatorString: String;
  location: String;
  favouritedIndicatorSlugs: Array<String>;
  user: UserType;
}

function useWindowSize() {
    
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

export function IndexLink(props: LinkProps){

  const windowSize = useWindowSize();


  
  const wrapperSize = useRef(null);
  const [width, setWidth] = useState(undefined);
  const [height, setHeight] = useState(undefined);
  
  useEffect(() => {
    if (wrapperSize.current){
      let height = wrapperSize.current.parentElement.offsetHeight;
      let width = wrapperSize.current.parentElement.offsetWidth;
      
      setWidth(width);
      setHeight(height);
      
    }
  }, [windowSize]);

  const nIndicators = props.indicators.length; ;
  const items = Math.min(Math.floor(width/220), nIndicators);
  const gutter = Math.floor(Math.min(width/items*0.1, 35));



  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 0 },
      items: items,
      partialVisibilityGutter: gutter
    }
  };

  const sparkline = {
    height: `${0.90*height}px`,
    width: `${220}px !important`,
  }

  const carouselWrapper = {
    height: `${height}px`,
    width: `${width}px`,
    paddingTop: `${0.05*height}px`
  }


  return(
    <div ref = {wrapperSize} style = {carouselWrapper}>
      <Carousel
        infinite
        arrows = {false}
        itemClass = {`${sparkline}`}
        partialVisible

        responsive={responsive}
        swipeable
        
        >
      {props && props.indicators.map((indicator) => (
        <IndicatorBox
          user={props.user}
          indicator={indicator}
          key={indicator.id}
          linkString={props.evaluateIndicatorString(indicator, props.location)}
          favouritedIndicatorSlugs={props.favouritedIndicatorSlugs}
          location={props.location}
          style={sparkline}
          />
      ))}
      </Carousel>
    </div>
  )
}
