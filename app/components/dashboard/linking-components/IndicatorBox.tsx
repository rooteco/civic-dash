import type { Indicator } from "~/models/theme.server";
import { Link } from "@remix-run/react";

type IndicatorBoxProps = {
  indicator: Indicator;
  linkString: String;
}

export function IndicatorBox(props: IndicatorBoxProps){
  return(
    <div key={props.indicator.id} style={{width: '100%', height: "100%", display: 'flex', flexDirection: "column"}}>
        <div style={{height: "30px", display: "flex"}}>
          <div style={{flex: 1}}/>
            <div style={{width: "30px", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "7px"}}>
              <button><h2 style={{fontSize: "20px", color: "yellow"}}>*</h2></button>
            </div>
        </div>
        <div style={{display: "flex", flex: 1, alignItems: "flexStart", justifyContent: 'center'}}>
          <Link to={props.linkString}>
            <p>{props.indicator.name}</p>
          </Link>
        </div>
    </div>
  )
}
