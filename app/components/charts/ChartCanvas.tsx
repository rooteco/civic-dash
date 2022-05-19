import { useState, useEffect } from 'react';
import { Line } from "~/components/charts/line"
import { Scatter } from "~/components/charts/scatter"
import { Bar } from "~/components/charts/bar"
import type { Config, Indicator } from "~/models/indicator.server"
import { formatValues } from "~/utils/formatValues"

interface CanvasProps {
  dataset: Array<any>;
  config: Config;
  indicator: Indicator;
}

export function ChartCanvas(props: CanvasProps){
  const [timeRange, setTimeRange] = useState("full")
  const [keys, setKeys] = useState(["NA", "NA"])

  useEffect(() => {
    setKeys(props.dataset ? Object.keys(props.dataset[0]) : ["NA", "NA"])
  }, [props]);

  if(props.dataset){
    return(
    <div className="SingleIndicatorWrapper">
      <div className="SingleIndicatorChart" style={{display: "flex", flexDirection: "column"}}>
        <div style={{width: "100%"}}>
          <div>
            <h2>{props.indicator ? props.indicator.name : "No indicator name found"}</h2>
            <p>{props.indicator ? props.indicator.description : "No indicator description found"}</p>
          </div>
          {props.config.xType === 'time' &&
            <div style={{display: "flex"}}>
              <div>
                <h2>{formatValues(props.dataset[props.dataset.length - 1][keys[1]] || "", props.config.yFormat)}</h2>
              </div>
              <div style={{marginLeft: "50px"}}>
                <h2>{props.dataset[props.dataset.length - 1][keys[0]]}</h2>
              </div>
            </div>
          }
        </div>

        {
          {
            'line': <Line dataset={props.dataset}
                          config={props.config}
                          timeRange={timeRange}
                          keys={keys}
                          />,

            'bar': <Bar dataset={props.dataset}
                        config={props.config}
                        keys={keys}
                        />,

            'scatter': <Scatter
                          dataset={props.dataset}
                          config={props.config}
                          timeRange={timeRange}
                          keys={keys}
                          />
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
