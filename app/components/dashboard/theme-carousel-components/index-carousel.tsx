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
      breakpoint: { max: 4000, min: 3000 },
      items: 2
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


  return(
    <div style={{border: "2px solid black", width: "200px", height: "200px"}}>
      <Carousel responsive={responsive}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
      </Carousel>
    </div>
  )
}

// {props && props.themes.map((theme)=>(
//     <div key={theme.id} className="ThemeButton">
//       <Link to={`/dashboard/theme/${theme.slug}`}>
//       <p>{theme.name}</p>
//       </Link>
//     </div>
// ))}
