import { dayStringToDate, conver } from '~/utils/plotting-utilities';
import {useEffect, useRef, useState} from 'react';
import { handleTimeRange } from "~/utils/handleTimeRange"
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

interface ScatterProps{
  dataset: Array<any>;
  config: Config;
  timeRange: String;
}

export function Scatter(props: ScatterProps) {
  const headerRef = useRef();
  const [data, setData] = useState();

  useEffect(() => {
    setData(props.dataset ? props.dataset : []);
  }, [props]);

  useEffect(() => {
    if (data === undefined) return;
    else if (props.keys.length < 3){
      const chart = Plot.plot({

        marginLeft: 100,
        insetBottom: 10,
        style: {
          backgroundColor: "white"
        },
        x: {
          ticks: 10,
          label: props.config ? props.config.xName : "Not Found",
          type: props.config ? props.config.xType : "linear"
        },
        y: {
          grid: true,
          label: props.config ? props.config.yName : "Not Found",
          type: props.config ? props.config.yType : "linear"
        },
        marks: [
          Plot.dot(handleTimeRange(data, props.timeRange), {x: props.keys[0], y: props.keys[1], stroke: "darkblue"})
        ],
        color: {
          scheme: "blues",
          type: "linear"
        }
      });
      headerRef.current.append(chart);
      return () => chart.remove();
    }
    // multiple lines in the same chart
    else{
      const chart = Plot.plot({
        marginLeft: 100,
        insetBottom: 10,
        style: {
          backgroundColor: "white"
        },
        x: {
          label: props.config ? props.config.xName : "Not Found",
          type: props.config ? props.config.xType : "linear"
        },
        y: {
          grid: true,
          label: props.config ? props.config.yName : "Not Found",
          type: props.config ? props.config.yType : "linear"
        },
        marks: [
          Plot.dot(handleTimeRange(data, props.timeRange), {x: props.keys[0], y: props.keys[1], z: 'division', stroke: "division"})
        ],
        color: {
          type: "categorical",
          scheme: "blues",
          legend: true,
        }
      });
      headerRef.current.append(chart);
      return () => chart.remove();
    }
  }, [data, props.timeRange]);

  return (
    <div>
      <header ref={headerRef}>
      </header>
    </div>
  );
}
