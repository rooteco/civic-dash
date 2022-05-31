const sumValues = obj => Object.values(obj).reduce((a,b) => a + b);

export function processCategoricalMarketData(marketBets){
  var graphData = []
  var probTracker = {}
  var lastProb = {}
  console.log("MARKET BETS:", marketBets)
  marketBets.forEach(bet => {

    // whenever you add a bet to the dataset, you have to recalculate the probabilities of all of the other categories

    // sum together all previous probabilities.
    // divide (1 - new probability) by this sum
    // this gives you the scaling factor for everything other than the new probability

    probTracker[bet.outcome] = bet.probAfter

    let scalingFactor = (1-bet.probAfter)/(sumValues(probTracker) - bet.probAfter)

    // update share tracker
    for(const [key, value] of Object.entries(probTracker)){
      probTracker[key] = bet.outcome === key ? value : value * scalingFactor
    }


    console.log("PROB TRACKER:", JSON.parse(JSON.stringify(probTracker)))

    for (const [key, value] of Object.entries(probTracker)){
      graphData.push({
        "x": bet.createdTime,
        "y": value,
        "z": key
      })
    }
  })
  return graphData
}

export function processBinaryMarketData(marketBets){
  var graphData = []
  if(marketBets.length > 0){
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
  }
  return graphData
}
