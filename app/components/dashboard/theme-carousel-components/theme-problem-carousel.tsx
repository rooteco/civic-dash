import { Link } from "@remix-run/react";
import { deslugify } from '~/utils/deslugify';
import { unpackRoutes } from '~/utils/unpackRoutes';

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
    <>
      <div className="WidgetActiveTheme">
        <div className="ThemeButtonActive">
          <p>{props.params ? deslugify(props.params.theme) : ""}</p>
        </div>
      </div>
      <div className="WidgetActiveProblem">
        <div className="ProblemButtonActive">
          <p>{props.params ? deslugify(props.params.problem) : ""}</p>
        </div>
      </div>
    </>
  )
}
