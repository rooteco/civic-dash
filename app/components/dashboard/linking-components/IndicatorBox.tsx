import type { Indicator } from "~/models/theme.server";
import { Link, Form } from "@remix-run/react";
import { UserType } from "~/models/user.server"
import graph from '../../../../public/assets/place_chart.svg';
import { useState } from 'react';
import FavoriteIndicator from '~/components/dashboard/FavoriteIndicator';

type IndicatorBoxProps = {
  indicator: Indicator;
  linkString: String;
  favouritedIndicatorSlugs: Array<String>;
  location: String;
  user: UserType;
  style: any;
}

export function IndicatorBox(props: IndicatorBoxProps) {


  const [visible, setVisible] = useState(false);

  const timeoutToggle = () => {
    setTimeout(() => {
      setVisible(!visible);
    }, 1000);
  }

  const metadataState = visible ? 'indicator-sparkline-metadata indicator-sparkline-metadata-hover' : 'indicator-sparkline-metadata';
  

  return (
    <div onMouseEnter={() => setVisible(true)} onMouseLeave={() => timeoutToggle()}>
      <Link to={props.linkString}>
        <div className="indicator-sparkline" style={props.style}>

          <div className={metadataState}>
            <p className="inscription truncate">{props.indicator.name}</p>

            <h3>{Math.round(Math.random() * 100)}</h3>
            <p className="inscription">{Math.round(Math.random() * 100)}%</p>

          </div>

          <div className="sparkline">
            <img src={graph ? graph : ""} alt="graph" className="sparkline" />
          </div>

          <div style={{ position: 'absolute', right: '8px', top: '8px' }}>
            <Form method="post" >
              <input type="hidden" name="indicatorSlug" value={props.indicator.slug} />
              <input type="hidden" name="isFavourited" value={props.favouritedIndicatorSlugs.some(obj => obj.slug === props.indicator.slug)} />
              <input type="hidden" name="userId" value={props.user ? props.user.id : ""} />
              <button type="submit" style={{ color: props.favouritedIndicatorSlugs.some(obj => obj.slug === props.indicator.slug) ? "white" : "grey" }}>
                <FavoriteIndicator visible={visible} />
              </button>
            </Form>
          </div>

        </div>
      </Link>
    </div>
  )
}

