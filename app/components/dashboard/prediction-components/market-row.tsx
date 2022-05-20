import React from "react";
export function MarketRow({
  handleButton,
  predictionMarket,
}) {
  return(
    <div 
        key={predictionMarket.id} 
        onClick={e => handleButton(e, predictionMarket)}
        className = "market-row">
            <div>
                <p className="caption">{predictionMarket.id}</p>
            </div>
            <div className="caption">
                <p>{predictionMarket.question}</p>
            </div>
    </div>
  ) 
}
  