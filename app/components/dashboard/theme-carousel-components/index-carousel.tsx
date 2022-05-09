import type { Theme } from "~/models/theme.server";
import { Link } from "@remix-run/react";

interface CarouselProps{
  themes: Theme[];
}

export function IndexCarousel(props: CarouselProps){
  return(
    <>
      {props && props.themes.map((theme)=>(
          <div key={theme.id} className="ThemeButton">
            <Link to={`/dashboard/theme/${theme.slug}`}>
            <p>{theme.name}</p>
            </Link>
          </div>
      ))}
    </>
  )
}
