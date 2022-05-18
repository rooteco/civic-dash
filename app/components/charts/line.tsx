import { dayStringToDate, conver } from '~/utils/plotting-utilities';
import {useEffect, useRef, useState} from 'react';
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

interface LineProps{
  dataset: Array<any>;
  config: Config;
}

export function Line(props) {
  const headerRef = useRef();
  const [data, setData] = useState();
  const [keys, setKeys] = useState(["NA", "NA"])

  useEffect(() => {
    setData(props.dataset ? props.dataset : []);
    setKeys(props.dataset ? Object.keys(props.dataset[0]) : ["NA", "NA"])
  }, [props]);

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
        label: props.config ? props.config.xName : "Not Found",
        type: props.config ? props.config.xType : ""
      },
      y: {
        grid: true,
        label: props.config ? props.config.yName : "Not Found"
      },
      marks: [
        Plot.line(data, {x: keys[0], y: keys[1], stroke: "darkblue"})
      ],
      color: {
        scheme: "blues",
        type: "linear"
      }
    });
    headerRef.current.append(chart);
    return () => chart.remove();
  }, [data]);

  return (
    <div>
      <header ref={headerRef}>
      </header>
    </div>
  );
}
