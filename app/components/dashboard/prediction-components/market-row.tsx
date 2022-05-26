import React from "react";
export function MarketRow({
  handleButton,
  predictionMarket,
}) {
  return(
    <div 
        key={predictionMarket.id} 
        onClick={e => handleButton(e, predictionMarket)}
        className = "market-row pad">
        <p className="caption">{predictionMarket.question}</p>
    </div>
  ) 
}
  