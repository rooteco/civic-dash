import { Link } from "@remix-run/react";
import { deslugify } from '~/utils/deslugify';
import ClearIcon from '@mui/icons-material/ClearRounded';

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
        <Link to='/dashboard'><ClearIcon sx = {{verticalAlign: "middle"}}/></Link>
      </div>

      {props.data && props.data.problems.map((problem)=>(
          <div key={problem.id} className="pill">
            <Link to={`problem/${problem.slug}`}>
              <span>{problem.name}</span>
            </Link>
          </div>
      ))}
    </div>


    </>
  )
}
