import ClearIcon from '@mui/icons-material/ClearRounded';
import { useEffect, useState } from "react"
import { processCategoricalMarketData, processBinaryMarketData } from "~/utils/processMarketData"
import PredictionChart from "~/components/dashboard/prediction-components/prediction-chart"
import Tooltip from '@mui/material/Tooltip';
import { formatValues } from "~/utils/formatValues";

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

export default function PredictionScaffold(props){
  const [processedData, setProcessedData] = useState([])

  useEffect(()=>{
    console.log("PROCESSED DATA", processedData)
  }, [processedData])

  useEffect(()=>{
    if(props.categorical){
      const processedDataset = processCategoricalMarketData(props.predictionMarket.fullData.bets)
      setProcessedData(processedDataset)
    }
    else{
      const processedDataset = processBinaryMarketData(props.predictionMarket.fullData.bets)
      setProcessedData(processedDataset)
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
                <p><b>Close Date: </b>{closeDate(props.predictionMarket.fullData.closeTime)}</p>
                <p><b>Status:</b> {isResolved(props.predictionMarket.fullData.isResolved)}</p>
                {props.categorical && <p></p>}
                {!props.categorical && <p><b>Market Volume: </b>${formatValues(roundProb(props.predictionMarket.fullData.totalLiquidity), 'wholeNumber')}</p>}
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

      <div className="market-description pad-unit" style={{display: "flex", flexDirection: "column"}}>
        <div style={{width: "100%", height: '300px'}}>
          <PredictionChart dataset={processedData} categorical={props.categorical}/>
        </div>
        <div style={{flex: 1}}/>
        <div>
          <p style={{color: 'white'}}>{props.predictionMarket.fullData.description}</p>
        </div>
        <div style={{display: "flex", paddingBottom: "20px", paddingTop: "20px", justifyContent: 'space-around'}}>
          <Tooltip title={<h3 style={{textAlign: 'center'}}>{"For v1, head to Manifold Markets' website to vote"}</h3>}>
            <button style={{backgroundColor: "white", borderRadius: "8px", height: "50px", width: "140px"}}>
              <h3 style={{color: "black"}}><a target="_blank" href={props.predictionMarket.fullData.url}>Vote <strong>YES</strong></a></h3>
            </button>
          </Tooltip>
          <Tooltip title={<h3 style={{textAlign: 'center'}}>{"For v1, head to Manifold Markets' website to vote"}</h3>}>
            <button style={{backgroundColor: "white", borderRadius: "8px", height: "50px", width: "140px"}}>
            <h3 style={{color: "black"}}><a target="_blank" href={props.predictionMarket.fullData.url}>Vote <strong>NO</strong></a></h3>
            </button>
          </Tooltip>
        </div>

      </div>
    </div>
  )
}
