import type { Indicator } from "~/models/theme.server";
import { Link } from "@remix-run/react";
import { slugify } from '~/utils/slugify';

interface LinkProps {
  indicators: Indicator[];
}

export function IndexIndicatorLink(props: LinkProps){
  return(
    <>
      {props && props.indicators.map((indicator) => (
      <div className="IndicatorContainer" key={indicator.id}>
        <Link to={`/dashboard/indicator/${indicator.slug}/${slugify(indicator.config.layout)}`}>
          <p>{indicator.name}</p>
        </Link>
      </div>
      ))}
    </>
  )
}