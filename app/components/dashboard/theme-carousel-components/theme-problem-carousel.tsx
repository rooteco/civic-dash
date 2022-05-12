import { deslugify } from '~/utils/deslugify';

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
      <div className="DashboardActiveTheme">
        <div className="ThemeButtonActive">
          <p>{props.params ? deslugify(props.params.theme) : ""}</p>
        </div>
      </div>
      <div className="DashboardActiveProblem">
        <div className="ProblemButtonActive">
          <p>{props.params ? deslugify(props.params.problem) : ""}</p>
        </div>
      </div>
    </>
  )
}
