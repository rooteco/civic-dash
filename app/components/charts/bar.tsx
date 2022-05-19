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
  const [keys, setKeys] = useState(["NA", "NA"])

  useEffect(() => {
    setData(props.dataset ? props.dataset : []);
    setKeys(props.dataset ? Object.keys(props.dataset[0]) : ["NA", "NA"])
  }, [props]);

  useEffect(() => {
    if (data === undefined) return;
    // single line in the chart
    const chart = Plot.plot({
      marginLeft: 100,
      insetBottom: 10,
      style: {
        backgroundColor: "white"
      },
      marks: [
        Plot.barY(data, {x: keys[0], y: keys[1]})
      ],
      style: {
        fontSize: 10
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
