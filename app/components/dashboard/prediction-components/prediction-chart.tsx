import {useEffect, useRef, useState} from 'react';
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

export default function PredictionChart(props){
  const headerRef = useRef();
  const [data, setData] = useState();

  useEffect(() => {
    console.log("DATASET:", props.dataset)
    setData(props.dataset ? props.dataset : []);
  }, [props]);

  useEffect(() => {
    if (data === undefined) return;

    const chart = Plot.plot({
      marginLeft: 100,
      insetBottom: 10,
      height: "100%",
      style: {
        backgroundColor: "white"
      },
      x: {
        label: 'Time',
        type: 'utc'
      },
      y: {
        label: "Probability",
        type: "linear"
      },
      marks: [
        Plot.line(data, {x: 'x', y: 'y', z: 'z', stroke: "z"})
      ],
      color: {
        type: "categorical",
        scheme: "blues",
        legend: true
      }
    });

    headerRef.current.append(chart);
    return () => chart.remove();
  }, [data])

  return(
    <div>
      <header ref={headerRef}>
      </header>
    </div>
  );
}
