import type { Indicator } from "~/models/theme.server";
import { Link } from "@remix-run/react";
import { slugify } from '~/utils/slugify';

interface LinkProps {
  indicator: Indicator;
  key: Number;
}

export function IndexIndicatorLink(props: LinkProps){
  return(
    <div className="IndicatorContainer" key={props.indicator.id}>
      <Link to={`/dashboard/indicator/${props.indicator.slug}/${slugify(props.indicator.config.layout)}`}>
        <h1>{props.indicator.name}</h1>
      </Link>
    </div>
  )
}
