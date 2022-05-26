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

  const lastUpdate = props.dataset[props.dataset.length - 1][keys[0]] || 0
  const indicatorName = props.indicator.name || "No name found"
  const indicatorDescription = props.indicator.description || "No description found"
  const currentValue = formatValues(props.dataset[props.dataset.length - 1][keys[1]] || "", props.config.yFormat)

  useEffect(() => {
    setKeys(props.dataset ? Object.keys(props.dataset[0]) : ["NA", "NA"])
  }, [props]);

  
  const dateFilters = [['M', 'month'], ['Y', 'year'], ['5Y', 'five-years'], ['Full',  'full']]


  if(props.dataset){
    return(
    <div className="flex-column indicatorwidget">

      <div className='indicator-header flex-column pad'>
        <h3 className=''>{indicatorName}</h3>
        <p>{indicatorDescription}</p>
      </div>

      <div className='indicator-body pad'>
        
        {props.config.xType === 'time' &&
          <div className='flex-space-between'>
              <h3>{currentValue}</h3>
              <p>{lastUpdate}</p>
          </div>
        }

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
        <div className='flex-row'>
          {dateFilters.map(([value, label]) => (
            <div key={value} className="pill" onClick={() => setTimeRange(label)}>
              <span>{value}</span>
            </div>
          ))}
        </div>

        }
      </div>

    </div>
    )
  }
  return(
    <div className="indicatorwidget">
      <h1>Chart config not set correctly</h1>
    </div>
  )
}
