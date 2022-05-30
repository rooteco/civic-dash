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
    console.log("DATASET:", props.dataset)
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
            labelOffset: 50,
            tickRotate: -10,
            label: props.config ? props.config.xName : "Not Found",
            type: props.config ? props.config.xType : "band",          },
          y: {
            grid: true,
            label: props.config ? props.config.yName : "Not Found",
            type: props.config ? props.config.yType : "band"
          },
          marks: [
            Plot.barY(data, {
              x: props.keys[0], 
              y: props.keys[1],
              fill: "white",})
          ],
          style: {
            fontSize: 14,
            backgroundColor: "#1A1A1A",
            color: "#7B7A77",
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
            Plot.barY(data, {x: props.keys[0], y: props.keys[1], z: 'z'})
          ],
          style: {
            fontSize: 14,
            backgroundColor: "#1A1A1A",
            color: "#7B7A77",
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
