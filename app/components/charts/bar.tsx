import { dayStringToDate, conver } from '~/utils/plotting-utilities';
import {useEffect, useRef, useState} from 'react';
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

interface BarProps{
  dataset: Array<any>;
  config: Config;
}

export function Bar(props) {
  const headerRef = useRef();
  const [data, setData] = useState();

  const barColors = [
    "#31646D",
    "#84a9b0",
    "#4F7C84",
    "#163a41",
    "#093036"
  ]


  useEffect(() => {
    setData(props.dataset ? props.dataset : []);
  }, [props]);

  useEffect(() => {
    if (data === undefined) return;
    // single line in the chart
    else if (props.keys.length < 3){
        const chart = Plot.plot({
          marginLeft: 100,
          marginRight: 50,
          marginTop: 30,
          marginBottom: 50,
          height: 400,
          width: 800,
          insetBottom: 10,
          scale: {
            type: "identity"
          },
          x: {
            tickRotate: -10,
            label: props.config ? props.config.xName : "Not Found",
            type: props.config ? props.config.xType : "band",
          },
          y: {
            grid: false,
            label: props.config ? props.config.yName : "Not Found",
            type: props.config ? props.config.yType : "band"
          },
          marks: [
            Plot.barY(data, {
              x: 'x',
              y: 'y',
              fill: "url(#linear-gradient)",
              
            })
          ],
          style: {
            fontSize: '16px',
            backgroundColor: "#1A1A1A",
            color: "rgba(239, 239, 239, 0.75)",
          }
          });
        headerRef.current.append(chart);
        return () => chart.remove();
        }
      else{
        const chart = Plot.plot({
          // marginLeft: 100,
          insetBottom: 10,
          x: {
            label: props.config ? props.config.xName : "Not Found",
            type: props.config ? props.config.xType : "linear",
          },
          y: {
            grid: true,
            label: props.config ? props.config.yName : "Not Found",
            type: props.config ? props.config.yType : "linear"
          },
          marks: [
            Plot.barY(data, {x: 'x', y: 'y', z: 'z'})
          ],
          style: {
            fontSize: '16px',
            backgroundColor: "#1A1A1A",
            color: "rgba(239, 239, 239, 0.75)",
          }
          });
        headerRef.current.append(chart);
        return () => chart.remove();
      }
  }, [data]);

  return (
    <div>
      <header ref={headerRef}>
      <svg height="0" width="0">
        <linearGradient
            id="linear-gradient"
            gradientTransform="rotate(90)">
            <stop offset="20%" stopColor={barColors[1]} stopOpacity="50%" />
            <stop offset="50%" stopColor={barColors[1]} stopOpacity="30%" />
            <stop offset="80%" stopColor={barColors[1]} stopOpacity="0%" />
        </linearGradient>
      </svg>
      </header>
    </div>
  );
}
