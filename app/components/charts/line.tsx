import { dayStringToDate, conver } from '~/utils/plotting-utilities';
import {useEffect, useRef, useState} from 'react';
import { handleTimeRange } from "~/utils/handleTimeRange"
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {useParentSize } from "~/utils/hooks";

interface LineProps{
  dataset: Array<any>;
  config: Config;
  timeRange: String;
  keys: Array<String>;
}

export function Line(props) {
  const headerRef = useRef();
  const [data, setData] = useState();

  const colors = [
    "#F369A4",
    "#CD0090",
    "#A2007E"
  ]

  useEffect(() => {
    setData(props.dataset ? handleTimeRange(props.dataset, props.timeRange) : [])
  }, [props]);


  useEffect(() => {
    if (data === undefined) return;
    // single line in the chart
    else if (props.keys.length < 3){
      const chart = Plot.plot({

        marginLeft: 100,
        marginRight: 50,
        marginTop: 50,
        marginBottom: 50,
        height: 400,
        width: 800,
        insetBottom: 10,
        style: {
          backgroundColor: "#1A1A1A",
          color: "rgba(239, 239, 239, 0.75)",
          fontSize: 16,
        },
        x: {
          // ticks: 5,
          label: props.config ? props.config.xName : "Not Found",
          type: props.config ? props.config.xType : "linear",
          // tickFormat: "%Y %m"

        },
        y: {
          grid: true,
          label: props.config ? props.config.yName : "Not Found",
          type: props.config ? props.config.yType : "linear"
        },
        marks: [
          Plot.line(data,
                      {x: 'x',
                       y: 'y',
                       stroke: colors[2],
                      }),
          Plot.areaY(data,
                      {x: 'x',
                       y: 'y',
                       fill: "url(#linear-gradient)"
                      })
        ],
        // color: {
        //   schema: "viridis"
        // }
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
          backgroundColor: "#1A1A1A",
          color: "rgba(239, 239, 239, 0.75)",
          fontSize: 16,
        },
        x: {
          ticks: 10,
          label: props.config ? props.config.xName : "Not Found",
          type: props.config ? props.config.xType : "linear"
        },
        y: {
          label: props.config ? props.config.yName : "Not Found",
          type: props.config ? props.config.yType : "linear"
        },
        marks: [
          Plot.line(handleTimeRange(data, props.timeRange),
                                    {x: 'x',
                                     y: 'y',
                                     z: 'z', stroke: "z"})
        ],
        color: {
          type: "categorical",
          scheme: "rdpu",
          legend: true
        }
      });
      headerRef.current.append(chart);
      return () => chart.remove();
    }
  }, [data, props.timeRange]);

  return (
    <>
    <div>
      <header ref={headerRef}>
      </header>
    </div>
    <svg height="0" width="0">
      <linearGradient
          id="linear-gradient"
          gradientTransform="rotate(90)"
          viewBox="0 0 0 0">
          <stop offset="30%" stopColor={colors[2]} stopOpacity="40%" />
          <stop offset="60%" stopColor={colors[1]} stopOpacity="30%" />
          <stop offset="90%" stopColor={colors[0]} stopOpacity="20%" />
      </linearGradient>
    </svg>
    </>
  );
}
