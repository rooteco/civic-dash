import type { Theme } from "~/models/theme.server";
import { Link } from "@remix-run/react";
import Pill from "~/components/dashboard/pill";

interface CarouselProps{
  themes: Theme[];
}
export function IndexCarousel(props: CarouselProps){

  return(
    <div className="carousel-wrapper flex-row">
      {props && props.themes.map((theme)=>(
         <Pill theme = {theme} key={theme.id} active={false}/>
      ))}
    </div>
  )
}
