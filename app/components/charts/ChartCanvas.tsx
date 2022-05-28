import { useState, useEffect } from 'react';
import { Link, useParams } from "@remix-run/react";
import { Line } from "~/components/charts/line";
import { Scatter } from "~/components/charts/scatter";
import { Bar } from "~/components/charts/bar";
import { exitIndicator } from "~/utils/exitIndicator"
import type { Config, Indicator } from "~/models/indicator.server"
import { formatValues } from "~/utils/formatValues"
import ClearIcon from '@mui/icons-material/ClearRounded';
import { Interweave } from 'interweave';
import { formatValues } from "~/utils/formatValues"
interface CanvasProps {
  dataset: Array<any>;
  config: Config;
  indicator: Indicator;
}

export function ChartCanvas(props: CanvasProps){
  const [timeRange, setTimeRange] = useState("full")
  const [keys, setKeys] = useState(["x", "y"])
  const params = useParams()
  const [lastUpdate, setLastUpdate] = useState(0)
  const [indicatorName, setIndicatorName] = useState("No name found")
  const [indicatorDescription, setIndicatorDescription] = useState("No description found")
  const [currentValue, setCurrentValue] = useState(0)

  useEffect(()=>{
    console.log("PARAMS:", params)
  }, [params])


    useEffect(()=>{
      setIndicatorName(props.indicator.name)
      setIndicatorDescription(props.indicator.description)
    }, [props])

    useEffect(()=>{
      setLastUpdate(props.dataset[props.dataset.length - 1][keys[0]])
      setCurrentValue(props.dataset[props.dataset.length - 1][keys[1]])
    }, [props])

  useEffect(() => {
    setKeys(props.dataset ? Object.keys(props.dataset[0]) : ["NA", "NA"])
  }, [props]);


  const dateFilters = [['M', 'month'], ['Y', 'year'], ['5Y', 'five-years'], ['Full',  'full']]

  // TODO: Convert inline styles to classes [Andre]
  if(props.dataset){
    return(
    <div className="flex-column indicatorwidget">

      <div className='indicator-header flex-column pad'>
        <div style={{display: "flex", width: "100%", paddingRight: "10px"}}>
          <div style={{}}>
            <h3>{indicatorName}</h3>
          </div>
          <div style={{flex: 1}}/>
          <div style={{width: "20px", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Link to={exitIndicator(params)}>
              <ClearIcon />
            </Link>
          </div>
        </div>
          <p>
            <Interweave content={indicatorDescription} />
          </p>
      </div>

      <div className='indicator-body pad'>
        {props.config.xType === 'time' &&
          <div className='flex-space-between'>
              <h3>{props.config ? formatValues(currentValue, props.config.yFormat) : currentValue}</h3>
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
