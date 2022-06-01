import type { Indicator } from "~/models/theme.server";
import { Link, Form } from "@remix-run/react";
import { UserType } from "~/models/user.server"
import graph from '../../../../public/assets/place_chart.svg';
import { useState, useEffect } from 'react';
import FavoriteIndicator from '~/components/dashboard/FavoriteIndicator';
import { formatYears } from "~/utils/formatYears";

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
  const [stats, setStats] = useState({});

  const timeoutToggle = () => {
    setTimeout(() => {
      setVisible(!visible);
    }, 1800);
  }

  const metadataState = visible ? 'indicator-sparkline-metadata indicator-sparkline-metadata-hover' : 'indicator-sparkline-metadata';

  return (
    <div onMouseEnter={() => setVisible(true)} onMouseLeave={() => timeoutToggle()}>
        <div className="indicator-sparkline" style={props.style}>

          <Link to={props.linkString}>
            <div className={metadataState}>
              
              <h4 className = "truncate-multiline">{props.indicator.name}</h4>
              <div className="flex-row">
                {props.indicator.recentValue.trim() === '' ? 
                '' : 
                <>
                  <p className="inscription value">{props.indicator.recentValue}</p> 
                  <div className="icon-xs"/>
                </>
                }
                
                <p className="inscription">{formatYears(props.indicator.recentTime)}</p>
              </div>
            </div>
          </Link>

          <div className="sparkline">
            <img src={graph ? graph : ""} alt="graph" className="sparkline" />
          </div>

          <div style={{ position: 'absolute', right: '8px', top: '8px' }}>
            <Form method="post" >
              <input type="hidden" name="indicatorSlug" value={props.indicator.slug} />
              <input type="hidden" name="isFavourited" value={props.favouritedIndicatorSlugs.some(obj => obj.slug === props.indicator.slug)} />
              <input type="hidden" name="userId" value={props.user ? props.user.id : ""} />
              <button type="submit" style={{ color: props.favouritedIndicatorSlugs.some(obj => obj.slug === props.indicator.slug) ? "white" : "grey" }}>
                <FavoriteIndicator
                    visible={visible}
                    selected={props.favouritedIndicatorSlugs.some(obj => obj.slug === props.indicator.slug)}
                    />
              </button>
            </Form>
          </div>
        </div>
    </div>
  )
}
