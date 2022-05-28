import type { Prediction } from "~/models/prediction.server";
import { Link } from "@remix-run/react";
import { PredictionMarket } from "@prisma/client";
import PredictionScaffold from "~/components/dashboard/prediction-components/prediction-scaffold"

interface PredictionProps{
  predictionMarket: Prediction;
  setPanelIsOpen: ()=>void;
}

// todo: add to utils

export function PredictionModal(props: PredictionProps){

  if (!props.predictionMarket.fullData) {
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
                </div>
              </div>

              <div className="flex-column probsticker">
              </div>
            </div>

          </div>

        </div>

        <div className="market-description pad-unit">
        </div>
      </div>
    )
  }
  if(props.isOpen){
    return(
      <PredictionScaffold
        setPanelIsOpen={props.setPanelIsOpen}
        predictionMarket={props.predictionMarket}
        categorical={props.predictionMarket.fullData.outcomeType === "FREE_RESPONSE"}
      />
    )
  }

  return(
    <div>
    </div>
  )
}
