import type { Prediction } from "~/models/prediction.server";
import { Link } from "@remix-run/react";

interface PredictionProps{
  predictionMarket: Prediction;
  setPanelIsOpen: ()=>void;
}

export function PredictionModal(props: PredictionProps){
  return(
      <>
        <button onClick={()=>props.setPanelIsOpen(false)}><b>Click me to close the modal</b></button>
        <p>
          {props.predictionMarket ? props.predictionMarket.question : ""}
          (DETAIL)
        </p>
      </>
  )
}
