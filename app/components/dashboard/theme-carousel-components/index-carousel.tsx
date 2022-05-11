import type { Theme } from "~/models/theme.server";
import { Link } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node"
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
      <Carousel
        responsive={responsive}
        autoPlay={false}
        itemClass="ThemeButton"
        containerClass="DashboardCarouselLibraryWrapper"
        centerMode={true}
        sliderClass="DashboardCarouselLibrarySlider"
        shouldResetAutoplay={false}
        >
        {props && props.themes.map((theme)=>(
            <div key={theme.id}>
              <Link to={`/dashboard/theme/${theme.slug}`}>
              <p>{theme.name}</p>
              </Link>
            </div>
        ))}
      </Carousel>
  )
}
