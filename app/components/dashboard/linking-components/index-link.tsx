import type { Indicator } from "~/models/theme.server";
import { Link } from "@remix-run/react";
import { slugify } from '~/utils/slugify';
import Carousel from 'react-multi-carousel';


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

      console.log(width, height);

    }
  }, []);

  const sparkline = {
    height: `${0.9*height}px`,
    backgroundColor: '#fa7a7a',
    width: "100px",
  }


  return(
    <div className="carousel-wrapper" ref = {wrapperSize} style = {{width: `
      ${width}px`, height: `${height}px`}}>
      <Carousel
        arrows = {false}

        className=""
        containerClass=""
        itemClass={sparkline}
        sliderClass="carousel-track"

        responsive={responsive}
        swipeable
        >
      {props && props.indicators.map((indicator) => (
      <div key = {indicator.id}>
        <Link to={`indicator/${indicator.slug}/${slugify(indicator.config ? indicator.config.layout : "")}`}>
          <p>{indicator.name}</p>
        </Link>
      </div>
      ))}
      </Carousel>
    </div>
  
  )
}
