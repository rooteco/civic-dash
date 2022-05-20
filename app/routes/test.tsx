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


export function CustomLeftArrow() {
  return (
    <div></div>
  )
}

export function CustomRightArrow() {
  return (
    <div></div>
  )
}


export default function Test(){
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };

  return(

    <div style = {{width: '50vw'}}>
      <Carousel
       responsive={responsive}
       infinite autoPlay
       customLeftArrow={<div />}
       customRightArrow={<div />}
       >
        <div>Item 1</div>
        <div>Item 2</div>
      </Carousel>
    </div>
  )
}
