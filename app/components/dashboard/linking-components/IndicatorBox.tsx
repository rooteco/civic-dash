import type { Indicator } from "~/models/theme.server";
import { Link, Form } from "@remix-run/react";
import { UserType } from "~/models/user.server"
import graph from '../../../../public/assets/place_chart.svg';

type IndicatorBoxProps = {
  indicator: Indicator;
  linkString: String;
  favouritedIndicatorSlugs: Array<String>;
  location: String;
  user: UserType;
  style: any;
}

export function IndicatorBox(props: IndicatorBoxProps){

  return(
    <div className = "indicator-sparkline flex" style={props.style}>

      <div className="indicator-sparkline-metadata">
        <Link to={props.linkString}>
          <p>{props.indicator.name}</p>
        </Link>
          <p>{Math.round(Math.random()*100)}</p>
          <p>{Math.round(Math.random()*100)}%</p>
      </div>

      <img src={graph ? graph : ""} alt="graph" className = "sparkline"/>

      <div style={{position: 'absolute'}}>
        <Form method="post" >
          <input type="hidden" name="indicatorSlug" value={props.indicator.slug}/>
          <input type="hidden" name="isFavourited" value={props.favouritedIndicatorSlugs.some(obj => obj.slug === props.indicator.slug)}/>
          <input type="hidden" name="userId" value={props.user ? props.user.id : ""}/>
          <button type="submit"><h2 style={{color: props.favouritedIndicatorSlugs.some(obj => obj.slug === props.indicator.slug) ? "yellow" : "white"}}>*</h2></button>
        </Form>
      </div>

    </div>
  )
}
