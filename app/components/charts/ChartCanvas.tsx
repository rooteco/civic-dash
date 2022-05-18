import { Line } from "~/components/charts/line"
import type { Config } from "~/models/indicator.server"


interface CanvasProps {
  dataset: Array<any>;
  config: Config;
}

export function ChartCanvas(props: CanvasProps){
  if(props.dataset){
    return(
    <div className="SingleIndicatorWrapper">
      <div className="SingleIndicatorChart">
        {
          {
            'line': <Line dataset={props.dataset} config={props.config}/>,
            'bar': <div><h1>Bar Chart</h1></div>,
            'scatter': <div><h1>Scatter Chart</h1></div>
          }[props.config.chartType] || <div><h1>Chart Type Error</h1></div>
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
