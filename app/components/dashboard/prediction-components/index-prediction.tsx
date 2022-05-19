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
    width: "32vw",
    height: "100vh",
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: '0px',
    left: 'auto',
    borderRadius: '0px',
    backgroundColor: 'rgba(16, 16, 16, 100)',
    border: '1px solid #3c3c3c'
  },
};



export function IndexPrediction(props: PredictionProps){
  const [panelIsOpen, setPanelIsOpen] = useState(true)
  
  const [activeMarket, setActiveMarket] = useState(props.predictionMarkets[0])
  const tableOpen = useContext(TableOpenContext)

  function handleButton(event, market){
    setPanelIsOpen(true)
    setActiveMarket(market)
  }

  return(
    <>
    {tableOpen &&
    <div className="markets">
    
      {props.categoryType ?
        <p className='caption'>Showing prediction markets for <b>{props.categoryType ? deslugify(props.categoryType) : ""}</b></p> :
        <p className= 'caption'>{"Favourite Markets".toUpperCase()}</p>
      }
    
      <div className="markets-table">
        {props.predictionMarkets && props.predictionMarkets.map((predictionMarket)=> (
          <MarketRow 
            key = {predictionMarket.id}
            handleButton={handleButton} 
            predictionMarket={predictionMarket}  />
        ))}
      </div>
        
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
    </>
  )
}

// <PredictionModal
// setPanelIsOpen={setPanelIsOpen}
// />
