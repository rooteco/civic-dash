import type { Prediction } from "~/models/prediction.server";
import { Link } from "@remix-run/react";
import { PredictionMarket } from "@prisma/client";

interface PredictionProps{
  predictionMarket: Prediction;
  setPanelIsOpen: ()=>void;
}

// todo: add to utils

const closeDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return `${month}/${year}`;
}

const roundProb = (probability) => {
  return Math.round(probability * 100);
}

const isOpen = (isOpen : boolean) => {
  return isOpen ? "Open" : "Closed";
}


export function PredictionModal(props: PredictionProps){

  if (!props.predictionMarket.fullData) {
    return null;
  }

  return(
    <div className="flex-column" style = {{height: "100%"}}>
      <div className="flex-column pad">
        
        <div className="flex-space-between">
          <span onClick={() => props.setPanelIsOpen(false)} className="pill">{"<-"}</span>
          <span onClick={() => props.setPanelIsOpen(false)} className="pill">X</span>
        </div>

        <div className="flex-column pad">
          <div className="flex-space-between" style={{alignItems: "flex-start"}}>
            <div className="flex-column">
              <h3 className="">{props.predictionMarket.question}</h3>
              <div className="flex-row">
                <p>{closeDate(props.predictionMarket.fullData.closeTime)}</p>
                <p>{isOpen(props.predictionMarket.fullData.isResolved)}</p>
                <p>${roundProb(props.predictionMarket.fullData.totalLiquidity)}</p>
              </div>
            </div>

            <div className="flex-column probsticker">
              <h2 className="">{roundProb(props.predictionMarket.fullData.probability)}</h2>
              <p><strong>{"%"}</strong></p>
            </div>
          </div>

        </div>

      </div>
    
      <div className="market-description pad-unit">
        <p>{"chart goes here"}</p>
        <p>{props.predictionMarket.fullData.description}</p>
      </div>
    </div>

  )
}
