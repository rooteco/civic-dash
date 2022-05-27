import type { Indicator } from "~/models/theme.server";
import { Link, Form } from "@remix-run/react";
import { UserType } from "~/models/user.server"
import graph from '../../../../public/assets/place_chart.svg';
import FavoriteIcon from '@mui/icons-material/Favorite';

type IndicatorBoxProps = {
  indicator: Indicator;
  linkString: String;
  favouritedIndicatorSlugs: Array<String>;
  location: String;
  user: UserType;
  style: any;
}

export function IndicatorBox(props: IndicatorBoxProps){
  // TODO ANDRE: ICON-S IS DE-CENTERING THE HEARTS
  return(
    <Link to={props.linkString}>
      <div className = "indicator-sparkline flex" style={props.style}>

          <div className="indicator-sparkline-metadata">
              <p className="inscription">{props.indicator.name}</p>

              <h3>{Math.round(Math.random()*100)}</h3>
              <p className="inscription">{Math.round(Math.random()*100)}%</p>
            
          </div>

        <div className="sparkline">
          <img src={graph ? graph : ""} alt="graph" className = "sparkline"/>
        </div>

        <div className = "pad" style={{position: 'absolute', right: '0px', bottom: '0px'}}>
          <Form method="post" >
            <input type="hidden" name="indicatorSlug" value={props.indicator.slug}/>
            <input type="hidden" name="isFavourited" value={props.favouritedIndicatorSlugs.some(obj => obj.slug === props.indicator.slug)}/>
            <input type="hidden" name="userId" value={props.user ? props.user.id : ""}/>
            <button type="submit" style={{color: props.favouritedIndicatorSlugs.some(obj => obj.slug === props.indicator.slug) ? "white" : "grey"}}><FavoriteIcon fontSize="6px" sx={{ stroke: "#4b4b4b", strokeWidth: 1, color: "rgba(0,0,0,0)" }}/></button>
          </Form>
        </div>

      </div>
    </Link>
  )
}
