import { Link } from "@remix-run/react";
import { deslugify } from '~/utils/deslugify';

type Params = {
  theme?: string;
}

type Data = {
  problems: Array<any>;
}

interface CarouselProps{
  params: Params;
  data: Data;
}



export function ThemeCarousel(props: CarouselProps){
  return(
    <>
    <div className="flex-row carousel-wrapper">
      <div className="pill pill-active">
        <span>{props.params ? deslugify(props.params.theme ? props.params.theme : "") : ""}</span>
      </div>

      {props.data && props.data.problems.map((problem)=>(
          <div key={problem.id} className="pill">
            <Link to={`problem/${problem.slug}`}>
              {problem.name}
            </Link>
          </div>
      ))}
    </div>
      

    </>
  )
}
