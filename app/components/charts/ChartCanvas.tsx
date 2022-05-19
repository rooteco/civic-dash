import { useState } from 'react';
import { Line } from "~/components/charts/line"
import { Scatter } from "~/components/charts/scatter"
import { Bar } from "~/components/charts/bar"
import type { Config } from "~/models/indicator.server"


interface CanvasProps {
  dataset: Array<any>;
  config: Config;
}

export function ChartCanvas(props: CanvasProps){
  const [timeRange, setTimeRange] = useState("full")
  if(props.dataset){
    return(
    <div className="SingleIndicatorWrapper">
      <div className="SingleIndicatorChart" style={{display: "flex", flexDirection: "column"}}>
        <div>

        </div>

        {
          {
            'line': <Line dataset={props.dataset}
                          config={props.config}
                          timeRange={timeRange}/>,

            'bar': <Bar dataset={props.dataset}
                        config={props.config}/>,

            'scatter': <Scatter
                          dataset={props.dataset}
                          config={props.config}
                          timeRange={timeRange}/>
          }[props.config.chartType] || <div><h1>Chart Type Error</h1></div>
        }
        {['line', 'scatter'].includes(props.config.chartType) && props.config.xType === 'time' &&
        <div style={{display: 'flex'}}>
          <button
            style={{backgroundColor: "white", margin: "10px"}}
            onClick={() => setTimeRange('month')}>
            M
          </button>
          <button
            style={{backgroundColor: "white", margin: "10px"}}
            onClick={()=> setTimeRange('year')}>
            Y
          </button>
          <button
            style={{backgroundColor: "white", margin: "10px"}}
            onClick={()=> setTimeRange('five-years')}>
            5Y
          </button>
          <button
            style={{backgroundColor: "white", margin: "10px"}}
            onClick={()=> setTimeRange('full')}>
            Full
          </button>
        </div>
        }

      </div>
    </div>
    )
  }
  return(
    <div className="SingleIndicatorWrapper">
      <div className="SingleIndicatorChart">
        <h1>Chart config not set correctly</h1>
      </div>
    </div>
  )
}
