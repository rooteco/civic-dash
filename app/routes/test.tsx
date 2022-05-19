import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { dayStringToDate } from '~/utils/plotting-utilities'

import {useEffect, useRef, useState} from 'react';
import plottingStyles from '~/styles/plotting.css'
import { getFromRedis } from "~/models/redis.server"
import type { LinksFunction, LoaderFunction } from "@remix-run/node";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: plottingStyles}
  ]
}

export const loader: LoaderFunction = async () => {
  const redisValue = await getFromRedis('median-list-prices')
  redisValue.forEach(dataObject => dataObject.date = dayStringToDate(dataObject.date))
  return redisValue
}

export default function Test() {
  const loaderData = useLoaderData();
  const headerRef = useRef();
  const [keys, setKeys] = useState([])
  const [data, setData] = useState();

  useEffect(() => {
    setData(loaderData);
    setKeys(Object.keys(loaderData[0]))
  }, [loaderData]);

  useEffect(() => {
    if (data === undefined) return;
    const chart = Plot.plot({

      marginLeft: 100,
      insetBottom: 10,
      style: {
        backgroundColor: "white"
      },
      x: {
        ticks: 10,
        label: keys[0],
        type: "time"
      },
      y: {
        grid: true,
        label: keys[1]
      },
      marks: [
        Plot.line(data, {x: keys[0], y: keys[1], z: 'division', stroke: "division"})
      ],
      color: {
        type: "categorical",
        scheme: "dark2",
        legend: true
      }
    });

    headerRef.current.append(chart);
    return () => chart.remove();
  }, [data]);

  return (
    <div className="Test">
      <header className="App-header" ref={headerRef}>
      </header>
    </div>
  );
}
