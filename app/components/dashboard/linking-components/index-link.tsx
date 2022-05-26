import { IndicatorBox } from "~/components/dashboard/linking-components/IndicatorBox"
import type { Indicator } from "~/models/theme.server";
import Carousel from 'react-multi-carousel';
import type { UserType } from "~/models/user.server";
import { useWindowSize } from "~/utils/hooks";

import { useRef, useEffect, useState } from 'react';


interface LinkProps {
  indicators: Indicator[];
  evaluateIndicatorString: String;
  location: String;
  favouritedIndicatorSlugs: Array<String>;
  user: UserType;
}



export function IndexLink(props: LinkProps){

  
  const wrapperSize = useRef(null);
  const [width, setWidth] = useState(undefined);
  const [height, setHeight] = useState(undefined);

  const windowSize = useWindowSize();  
  
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
  const gutter = (width - items*220 - items*8)/(items);



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
        autoPlay
        autoPlaySpeed={2000}
        responsive={responsive}
        
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
