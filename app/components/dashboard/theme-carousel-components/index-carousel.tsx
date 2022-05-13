import type { Theme } from "~/models/theme.server";
import { Link } from "@remix-run/react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface CarouselProps{
  themes: Theme[];
}

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export function IndexCarousel(props: CarouselProps){
  return(
    <>
      {props && props.themes.map((theme)=>(
          <div key={theme.id} className="pill">
            <Link to={`/dashboard/theme/${theme.slug}`}>
            <p>{theme.name}</p>
            </Link>
          </div>
      ))}
    </>
  )
}


// <Carousel
// swipeable={true}
// draggable={true}
// showDots={true}
// responsive={responsive}
//   >
