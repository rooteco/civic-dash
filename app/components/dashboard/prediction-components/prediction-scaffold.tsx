import ClearIcon from '@mui/icons-material/ClearRounded';
import { useEffect, useState } from "react"
import { processCategoricalMarketData, processBinaryMarketData } from "~/utils/processMarketData"
import PredictionChart from "~/components/dashboard/prediction-components/prediction-chart"

const closeDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${month}/${year}`;
}

const roundProb = (probability) => {
  return (probability * 100).toFixed(0)
}

const isResolved = (isResolved : boolean) => {
  return isResolved ? "Closed" : "Open";
}

export default function PredictionScaffoldCategorical(props){
  const [processedData, setProcessedData] = useState([])

  useEffect(()=>{
    console.log("PREDICTION MARKET", props.predictionMarket)
  }, [props.predictionMarket])

  useEffect(()=>{
    if(props.categorical){
      setProcessedData(processCategoricalMarketData(props.predictionMarket.fullData.bets))
    }
    else{
      setProcessedData(processBinaryMarketData(props.predictionMarket.fullData.bets))
    }
  }, [props.predictionMarket])

  return(
    <div className="flex-column" style = {{height: "100%"}}>
      <div className="flex-column pad">
        <div className="flex-space-between">
          <span onClick={() => props.setPanelIsOpen(false)} className="pill"><ClearIcon sx={{verticalAlign: "middle", color: 'white'}}/></span>
        </div>

        <div className="flex-column pad">
          <div className="flex-space-between" style={{alignItems: "flex-start"}}>
            <div className="flex-column">
              <h3 className="">{props.predictionMarket.question}</h3>
              <div className="flex-row">
                <p><strong>Close: </strong>{closeDate(props.predictionMarket.fullData.closeTime)}</p>
                <p>{isResolved(props.predictionMarket.fullData.isResolved)}</p>
                {props.categorical && <p></p>}
                {!props.categorical && <p>${roundProb(props.predictionMarket.fullData.totalLiquidity)}</p>}
              </div>
            </div>

            <div className="flex-column probsticker">
              {!props.categorical &&
                <React.Fragment>
                <h2 className="">{roundProb(props.predictionMarket.fullData.probability)}</h2>
                <p><strong>{"%"}</strong></p>
                </React.Fragment>
              }
              {props.categorical &&
                <React.Fragment>
                  <h4 style={{color: 'white'}}>Free Response</h4>
                </React.Fragment>
              }
            </div>
          </div>
        </div>

      </div>

      <div className="market-description pad-unit">
        <div style={{border: '2px dashed red', width: "100%", height: '250px'}}>
          <PredictionChart dataset={processedData} />
        </div >
        <div>
          <p>{props.predictionMarket.fullData.description}</p>
        </div>
      </div>
    </div>
  )
}
