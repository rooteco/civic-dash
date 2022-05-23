import type { Theme } from "~/models/theme.server";
import { Link } from "@remix-run/react";

interface CarouselProps{
  themes: Theme[];
}
export function IndexCarousel(props: CarouselProps){

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 0 },
      items: 10
    },
  };


  return(
    <div className="carousel-wrapper flex-row">
      {props && props.themes.map((theme)=>(

          <div key={theme.id} className = "pill">
            <Link to={`/dashboard/theme/${theme.slug}`}>
              <span> {theme.name} </span>
            </Link>
          </div>
      ))}
    </div>
  )
}
