import type { Indicator } from "~/models/theme.server";
import { Link } from "@remix-run/react";
import { slugify } from '~/utils/slugify';
import React from 'react';

interface LinkProps {
  indicator: Indicator;
  key: Number;
}

export function IndexLink(props: LinkProps){
  return(
    <div className="IndicatorContainer" key={props.indicator.id}>
      <Link to={`indicator/${props.indicator.slug}/${slugify(props.indicator.config.layout)}`}>
        <h1>{props.indicator.name}</h1>
      </Link>
    </div>
  )
}
