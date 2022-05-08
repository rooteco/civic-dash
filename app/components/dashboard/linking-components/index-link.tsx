import type { Indicator } from "~/models/theme.server";
import { Link } from "@remix-run/react";
import { slugify } from '~/utils/slugify';

interface LinkProps {
  indicators: Indicator[];
}

export function IndexLink(props: LinkProps){
  return(
    <>
      {props && props.indicators.map((indicator) => (
      <div className="IndicatorContainer" key={indicator.id}>
        <Link to={`indicator/${indicator.slug}/${slugify(indicator.config.layout)}`}>
          <h1>{indicator.name}</h1>
        </Link>
      </div>
      ))}
    </>
  )
}
