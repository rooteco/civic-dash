import type { Indicator } from "~/models/theme.server";
import { Link } from "@remix-run/react";
import { slugify } from '~/utils/slugify';
import graph from '../../../public/assets/place_chart.svg';

function IndicatorSparkline({indicator, style}) {
  return (
    <Link to={`indicator/${indicator.slug}/${slugify(indicator.config ? indicator.config.layout : "")}`}>
        <div className = "indicator-sparkline flex" style={style}>
            
            <div className="indicator-sparkline-metadata">
                <p>{indicator.name}</p>
                <p>{Math.round(Math.random()*100)}</p>
                <p>{Math.round(Math.random()*100)}%</p>

            </div>
            
       
            <img src={graph} alt="graph" className = "sparkline"/>
            
            
        </div>
    </Link>
  )
}

export default IndicatorSparkline;