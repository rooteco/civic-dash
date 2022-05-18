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
        <Line dataset={props.dataset} config={props.config}/>
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
