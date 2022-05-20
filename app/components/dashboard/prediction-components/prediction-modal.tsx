import type { Prediction } from "~/models/prediction.server";
import { Link } from "@remix-run/react";
import { PredictionMarket } from "@prisma/client";

interface PredictionProps{
  predictionMarket: Prediction;
  setPanelIsOpen: ()=>void;
}

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
      <div className = "flex-column">
        <div className = "flex-space-between">
          <span onClick={()=>props.setPanelIsOpen(false)} className = "pill">X</span>
          <span onClick={()=>props.setPanelIsOpen(false)} className = "pill">X</span>
        </div>

        <div className = "flex-space-between">
          <div className = "flex-row">
            <div className = "flex-column" style = {{width: "66%"}}>
              <p className = "">{props.predictionMarket.question}</p>
            </div>

            <div className = "flex-column" style = {{width: "33%"}}>
              <p className = "">{roundProb(props.predictionMarket.fullData.probability)}</p>
              <p>{"%"}</p>
            </div>
          </div>

        </div>

        <div className = "flex-row">
            <p>{closeDate(props.predictionMarket.fullData.closeTime)}</p>
            <p>{isOpen(props.predictionMarket.fullData.isResolved)}</p>
            <p>${roundProb(props.predictionMarket.fullData.totalLiquidity)}</p>
        </div>

        <div className = "flex-column">
          <p>{"chart goes here"}</p>
          <p>{props.predictionMarket.fullData.description}</p>
        </div>
      </div>


  )
}
