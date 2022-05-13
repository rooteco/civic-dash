import React, { useState, useEffect, useContext } from 'react';
import type { Prediction } from "~/models/prediction.server";
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
    position: 'fixed',
    top: 0,
    left: 'auto',
    right: 0,
    bottom: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    width: "26vw",
    height: "100vh",
  },
  content: {
    width: "26vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 'auto',
    left: 'auto',
  },
};

export function IndexPrediction(props: PredictionProps){
  const [panelIsOpen, setPanelIsOpen] = useState(false)
  const [activeMarket, setActiveMarket] = useState("")
  const tableOpen = useContext(TableOpenContext)

  function handleButton(event, market){
    setPanelIsOpen(true)
    setActiveMarket(market)
  }

  return(
    <>
    {tableOpen &&
    <div className="DashboardInsetTable">
      <div>
        {props.categoryType ?
          <h3>Showing prediction markets for <b>{props.categoryType ? deslugify(props.categoryType) : ""}</b></h3> :
          <h3>Showing favourited prediction markets</h3>
          }
        <ul>
          {props.predictionMarkets && props.predictionMarkets.map((predictionMarket)=> (
            <div key={predictionMarket.id}>
              <li key={predictionMarket.id}>
                <button onClick={(event) => handleButton(event, predictionMarket)}>
                  -{predictionMarket.question} (INDEX)
                </button>
              </li>
            </div>
          ))}
        </ul>
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
