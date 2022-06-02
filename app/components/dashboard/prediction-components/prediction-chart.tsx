import {useEffect, useRef, useState} from 'react';
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

export default function PredictionChart(props){
  const headerRef = useRef();
  const [data, setData] = useState();


  const colors = [
      "#F369A4",
      "#CD0090",
      "#A2007E"
  ]

  useEffect(() => {
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
          backgroundColor: "rgba(0, 0, 0, 0)",
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
          // tickFormat: d => d.toString().concat("%")
          },
        marks: [
          Plot.areaY(data,
            {x: 'x',
             y: 'y',
             fill: "url(#linear-gradient)"
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
          legend: false,
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
      <svg height="0" width="0">
        <linearGradient
            id="linear-gradient"
            gradientTransform="rotate(90)">
            <stop offset="30%" stopColor={colors[2]} stopOpacity="10%" />
            <stop offset="60%" stopColor={colors[1]} stopOpacity="10%" />
            <stop offset="90%" stopColor={colors[0]} stopOpacity="10%" />
        </linearGradient>
      </svg>
    </div>
  );
}
