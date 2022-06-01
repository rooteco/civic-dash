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
            grid: true,
            label: props.config ? props.config.yName : "Not Found",
            type: props.config ? props.config.yType : "band"
          },
          marks: [
            Plot.barY(data, {
              x: 'x',
              y: 'y',
              fill: "rgba(184, 0, 133, 1)"})
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
      </header>
    </div>
  );
}
