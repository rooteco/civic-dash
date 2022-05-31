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
    if(props.categorical){
      const chart = Plot.plot({
        height: 300,
        x: {
          label: 'Time',
          type: 'utc',
        },
        y: {
          label: "Probability (%)",
          ticks: 5,
          type: "linear",
          grid: true,
          },
        marks: [
            Plot.areaY(data,
              Plot.stackY({
                x: "x",
                y: "y",
                fill: "z",
              })
            )
        ],
        color: {
          type: "categorical",
          scheme: "blues",
          legend: true,
          columns: 1,
          style: {
            color: 'white',
            paddingBottom: '20px'
          }
        },
        style: {
          fontSize: '12px',
        }
      });

      headerRef.current.append(chart);
      return () => chart.remove();
    }

    else{
      const chart = Plot.plot({
        height: 300,
        style: {
          backgroundColor: "#222222",
          fontSize: "16px",
          color: 'white'
        },
        x: {
          label: '',
          type: 'utc',
        },
        y: {
          percent: true,
          label: "",
          ticks: 5,
          type: "linear",
          domain: [0, 100],
          grid: true,
          tickFormat: d => d.toString().concat("%")
          },
        marks: [
          Plot.areaY(data,
            {x: 'x',
             y: 'y',
             fill: 'none'
           }),
           Plot.line(data,
             {x: "x",
              y: "y",
              stroke: "#AB4A7A",
            }),
          Plot.dot(data,{
            x: "x",
            y: "y",
            fill: "#AB4A7A",
          })
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
  }, [data])

  return(
    <div>
      <header ref={headerRef}>
      </header>
    </div>
  );
}
