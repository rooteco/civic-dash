import type { Theme } from "~/models/theme.server";
import { Link } from "@remix-run/react";
import Carousel from 'react-multi-carousel';

interface CarouselProps{
  themes: Theme[];
}
export function IndexCarousel(props: CarouselProps){

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 0 },
      items: 2
    },
  };


  return(
    <div className="carousel-wrapper">
      <Carousel
        arrows = {false}
        responsive={responsive}
        autoPlay={false}
        itemClass="pill"
        centerMode={true}
        sliderClass="carousel-track"
        shouldResetAutoplay={false}
        >
        {props && props.themes.map((theme)=>(
            <div key={theme.id}>
              <Link to={`/dashboard/theme/${theme.slug}`}>
                <span> {theme.name} </span>
              </Link>
            </div>
        ))}
      </Carousel>
    </div>
  )
}
