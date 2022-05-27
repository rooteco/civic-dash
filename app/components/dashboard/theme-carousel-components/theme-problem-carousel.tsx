import { deslugify } from '~/utils/deslugify';
import { useParams, Link } from "@remix-run/react"
import Pill from '~/components/dashboard/pill';
import ClearIcon from '@mui/icons-material/ClearRounded';
import { exitIndicator } from "~/utils/exitIndicator"

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
  const params = useParams();
  return(
    <div className="carousel-wrapper flex-row">
      <div className="pill pill-active">
        <span>{props.params ? deslugify(props.params.theme) : ""}</span>
        <div><Link to='/dashboard'><ClearIcon sx = {{verticalAlign: "middle"}}/></Link></div>
      </div>
      <div className="pill pill-active">
        <span>{props.params ? deslugify(props.params.problem) : ""}</span>
        <div><Link to={`/dashboard/theme/${params.theme}`}><ClearIcon sx = {{verticalAlign: "middle"}}/></Link></div>
      </div>
    </div>
  )
}
