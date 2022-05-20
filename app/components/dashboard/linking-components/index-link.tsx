import { IndicatorBox } from "~/components/dashboard/linking-components/IndicatorBox"
import type { Indicator } from "~/models/theme.server";
import Carousel from 'react-multi-carousel';

interface LinkProps {
  indicators: Indicator[];
  evaluateIndicatorString: String;
  location: String;
  favouritedIndicatorSlugs: Array<String>;
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
        <IndicatorBox
          indicator={indicator}
          key={indicator.id}
          linkString={props.evaluateIndicatorString(indicator, props.location)}
          favouritedIndicatorSlugs={props.favouritedIndicatorSlugs}
          location={props.location}
          />
      ))}
      </Carousel>
    </>
  )
}
