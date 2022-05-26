import { deslugify } from '~/utils/deslugify';
import Pill from '~/components/dashboard/pill';

// Fix this, this is bad practice
type Params = {
  theme: string | undefined;
  problem: string | undefined;
}

type Data = {
  problems: Array<any>;
}

interface CarouselProps{
  params: Params;
}

export function ThemeProblemCarousel(props: CarouselProps){
  return(
    <div className="carousel-wrapper flex-row">
      <div className="pill pill-active">
        <span>{props.params ? deslugify(props.params.theme) : ""}</span>
      </div>
      <div className="pill pill-active">
        {props.params ? deslugify(props.params.problem) : ""}
      </div>
    </div>
  )
}
