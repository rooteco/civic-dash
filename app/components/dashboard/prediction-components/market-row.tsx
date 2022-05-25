import React from "react";
export function MarketRow({
  handleButton,
  predictionMarket,
}) {
  return(
    <div 
        key={predictionMarket.id} 
        onClick={e => handleButton(e, predictionMarket)}
        className = "market-row flex-row">
            <div className="caption pad">
                <p>{predictionMarket.question}</p>
            </div>
    </div>
  ) 
}
  