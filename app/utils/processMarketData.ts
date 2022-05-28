export function processCategoricalMarketData(marketBets){
  var graphData = []
  marketBets.forEach(bet => {
    graphData.push({
        "x": bet.createdTime,
        "y": bet.probAfter,
        "z": bet.outcome,
    })
  })
  return graphData
}

export function processBinaryMarketData(marketBets){
  var graphData = []
  marketBets.forEach(bet => {
    graphData.push({
      "x": bet.createdTime,
      "y": bet.probAfter
    })
  })
  return graphData
}
