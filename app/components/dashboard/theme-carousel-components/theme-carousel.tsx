import { Link } from "@remix-run/react";
import { deslugify } from '~/utils/deslugify';
import Carousel from 'react-multi-carousel';

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

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 0 },
      items: 2
    },
  };

export function ThemeCarousel(props: CarouselProps){
  return(
    <>
    <div className="">
      <div className="pill">
        <p>{props.params ? deslugify(props.params.theme ? props.params.theme : "") : ""}</p>
      </div>
    </div>
      <Carousel
        responsive={responsive}
        autoPlay={false}
        itemClass="pill"
        containerClass=""
        centerMode={true}
        sliderClass=""
        shouldResetAutoplay={false}
        >
      {props.data && props.data.problems.map((problem)=>(
          <div key={problem.id} className="pill">
            <Link to={`problem/${problem.slug}`}>
              {problem.name}
            </Link>
          </div>
      ))}
      </Carousel>
    </>
  )
}
