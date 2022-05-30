export function processCategoricalMarketData(marketBets){
  var graphData = []
  var lastProb = {}
  marketBets.forEach(bet => {
    graphData.push({
        "x": bet.createdTime,
        "y": bet.probAfter,
        "z": bet.outcome,
    })
    lastProb[bet.outcome] = bet.probAfter
  })
  // take the last value and extend it to the present time

  for (const [key, value] of Object.entries(lastProb)){
    graphData.push({
      "x": new Date().getTime(),
      "y": value,
      "z": key
    })
  }
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

  // take the last value and extend it to the present time
  let lastData = graphData[graphData.length - 1]
  let currentData = {
    "x": new Date().getTime(),
    "y": lastData.y
  }
  graphData.push(currentData)
  return graphData
}
