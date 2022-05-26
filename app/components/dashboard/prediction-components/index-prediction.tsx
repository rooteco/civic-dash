import { MarketRow } from './market-row';
import React, { useState, useEffect, useContext } from 'react';
import type { Prediction, FullPredictionMarket } from "~/models/prediction.server";
import { Link, useParams } from "@remix-run/react"
import Modal from "react-modal";
import { PredictionModal } from './prediction-modal'
import { TableOpenContext } from "~/components/dashboard/DashboardWrapper"
import { deslugify } from "~/utils/deslugify"

interface PredictionProps{
  predictionMarkets: Prediction[];
  categoryType?: String;
}

const customStyles = {
  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  content: {
    width: "32.5vw",
    height: "102vh",
    position: "fixed",
    top: "-1px",
    right: "-1px",
    bottom: '-px',
    left: 'auto',
    borderRadius: '0px',
    backgroundColor: 'rgba(16, 16, 16, 100)',
    border: '1px solid #3c3c3c',
    padding: '0px'
  },
};



export function IndexPrediction(props: PredictionProps){
  const [panelIsOpen, setPanelIsOpen] = useState(false);
  
  const [activeMarket, setActiveMarket] = useState(props.predictionMarkets[0])
  const tableOpen = useContext(TableOpenContext)

  function handleButton(event, market){
    setPanelIsOpen(panelIsOpen => !panelIsOpen)
    setActiveMarket(market)
  }

  return(
      <div>
        <div className="inscription" style = {{margin: "2px"}}>
        {props.categoryType ?
          <p> Markets for <b>{props.categoryType ? deslugify(props.categoryType) : ""}</b></p> :
          <p>{"Favourite Markets"}</p>
        }
        </div>
      
        {tableOpen &&
        
          <div className="flex-column">
            {props.predictionMarkets && props.predictionMarkets.map((predictionMarket)=> (
              <MarketRow 
                key = {predictionMarket.id}
                handleButton={handleButton} 
                predictionMarket={predictionMarket}  />
            ))}
          </div>
        }

      

        <Modal
          isOpen={panelIsOpen}
          onRequestClose={()=>setPanelIsOpen(false)}
          style={customStyles}
          ariaHideApp={false}
          >
          <PredictionModal
            setPanelIsOpen={setPanelIsOpen}
            predictionMarket={activeMarket}
          />
        </Modal>
    </div>
  )
}

// <PredictionModal
// setPanelIsOpen={setPanelIsOpen}
// />
