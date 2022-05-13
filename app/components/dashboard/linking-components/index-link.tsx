import type { Indicator } from "~/models/theme.server";
import { Link } from "@remix-run/react";
import { slugify } from '~/utils/slugify';
import Carousel from 'react-multi-carousel';

interface LinkProps {
  indicators: Indicator[];
}

export function IndexLink(props: LinkProps){

  const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 0 },
        items: 2
      },
    };

  return(
    <>
      <Carousel
        responsive={responsive}
        autoPlay={false}
        itemClass="IndicatorContainer"
        containerClass="IndicatorCarouselWrapper"
        centerMode={true}
        sliderClass="IndicatorCarouselSlider"
        shouldResetAutoplay={false}
        >
      {props && props.indicators.map((indicator) => (
      <div key={indicator.id}>
        <Link to={`indicator/${indicator.slug}/${slugify(indicator.config ? indicator.config.layout : "")}`}>
          <p>{indicator.name}</p>
        </Link>
      </div>
      ))}
      </Carousel>
    </>
  )
}
