import type { Indicator } from "~/models/theme.server";
import { Link, Form } from "@remix-run/react";
import { UserType } from "~/models/user.server"

type IndicatorBoxProps = {
  indicator: Indicator;
  linkString: String;
  favouritedIndicatorSlugs: Array<String>;
  location: String;
  user: UserType;
}

export function IndicatorBox(props: IndicatorBoxProps){

  return(
    <div key={props.indicator.id} style={{width: '100%', height: "100%", display: 'flex', flexDirection: "column"}}>
        <div style={{height: "30px", display: "flex"}}>
          <div style={{flex: 1}}/>
            <div style={{width: "30px", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "7px"}}>
              <Form method="post" >
                <input type="hidden" name="indicatorSlug" value={props.indicator.slug}/>
                <input type="hidden" name="isFavourited" value={props.favouritedIndicatorSlugs.some(obj => obj.slug === props.indicator.slug)}/>
                <input type="hidden" name="userId" value={props.user ? props.user.id : ""}/>
                <button type="submit"><h2 style={{fontSize: "20px", color: props.favouritedIndicatorSlugs.some(obj => obj.slug === props.indicator.slug) ? "yellow" : "white"}}>*</h2></button>
              </Form>
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
