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
      <div className="">
        <div className="pill">
          {props.params ? deslugify(props.params.theme) : ""}
        </div>
      </div>
      <div className="">
        <div className="pill">
          {props.params ? deslugify(props.params.problem) : ""}
        </div>
      </div>
    </>
  )
}
