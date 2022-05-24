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

export function IndexLink(props: LinkProps){

  // TODO: This is a hack to get the carousel to render correctly.
  // partialVisibilityGutter should be set to indicators.length | something sensible

  // CAROUSEL STUFF
  const items = props.indicators.length > 2 ? 2 : props.indicators.length;


  const gutter = items > 1 ? 220 / items : 0;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 0 },
      items: items,
      partialVisibilityGutter: gutter
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
  }, [wrapperSize]);

  const sparkline = {
    height: `${0.65*height}px`,
    width: `${220}px !important`,
    flex: '0 0 auto !important'
  }

  const carouselWrapper = {
    height: `${height}px`,
    width: `${width}px`,
    flex: '0 0 auto !important',

  }

  const carouselTrack = {
    // TODO: this does not work
    // center the carousel with flex
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: "4 px", 
  }

  return(
    <div ref = {wrapperSize} style = {carouselWrapper}>
      <Carousel
        infinite
        arrows = {false}
        autoPlay
        sliderClass={`${carouselTrack}`}
        partialVisible = {true}
        itemClass = {`${sparkline}`}

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
