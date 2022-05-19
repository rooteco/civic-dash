import { db } from "~/utils/db.server";

export type Prediction = {
  id: Number;
  question: String;
  slug: String;
  description: String;
  marketVolume: Number;
  author: String;
  dateCreated: Date;
}


export type FullPredictionMarket = {
  id: String;
  creatorUsername: String;
  creatorName: String;
  createdTime: Number;
  closeTime: Number;
  question: String;
  description: String;
  tags: Array<String>;
  url: String;
  pool: Number;
  probability: Number;
  volume7Days: Number;
  volume24Hours: Number;
  isResolved: Boolean;
  bets: Array<Bet>;
  comments: Array<Comment>;
}

export type Bet = {
  createdTime: Number;
  isAnte: Boolean;
  shares: Number;
  userId: String;
  amount: Number;
  probAfter: Number;
  probBefore: Number;
  id: String;
  outcome: String;
  contractId: String;
}

export type Comment = {
  contractId: String;
  userUsername: String;
  userAvatarUrl: String;
  userId: String;
  text: String;
  createdTime: Number;
  id: String;
  betId: String;
  userName: String;
}

async function getFullPredictions(predictionMarkets: Array<Prediction>): Array<FullPredictionMarket>{

  var fullArray: Array<any> = []
  for (const market of predictionMarkets){
    const fullMarket = await fetch(`https://manifold.markets/api/v0/slug/${market.slug}`)
    .then((response) => response.json())
    .then((jsonResponse) => jsonResponse.error ? fullArray.push({...market}) : fullArray.push({...market, fullData: jsonResponse}))
  }

  return fullArray
}

export async function getPredictionsByFavourite(): Promise<Array<Prediction>>{
  const predictionMarkets = await db.predictionMarket.findMany({
    where: {
      favourite: true
    }
  })


  const fullArray = await getFullPredictions(predictionMarkets)

  return fullArray
}

export async function getPredictionsByTheme(theme_slug: string): Promise<Array<Prediction>>{
  const predictionMarkets = await db.predictionMarket.findMany({
    where: {
      themes: {
        some: {
          theme: {
            slug: theme_slug
          }
        }
      }
    }
  })

  const fullArray = await getFullPredictions(predictionMarkets)

  return predictionMarkets
}

export async function getPredictionsByProblem(problem_slug: string): Promise<Array<Prediction>>{
  const predictionMarkets = await db.predictionMarket.findMany({
    where: {
      problems: {
        some: {
          problem: {
            slug: problem_slug
          }
        }
      }
    }
  })

  const fullArray = await getFullPredictions(predictionMarkets)

  return predictionMarkets
}

export async function getPredictionsByIndicator(indicator_slug: string): Promise<Array<Prediction>>{
  const predictionMarkets = await db.predictionMarket.findMany({
    where: {
      indicators: {
        some: {
          indicator: {
            slug: indicator_slug
          }
        }
      }
    }
  })

  const fullArray = await getFullPredictions(predictionMarkets)

  return predictionMarkets
}

export async function getPredictionBySlug(prediction_slug: string): Promise<Prediction>{
  const predictionMarket = await db.predictionMarket.findUnique({
    where: {
      slug: prediction_slug
    }
  })
  const fullPredictionMarket = await getMarketInfo(prediction_slug)
  return {predictionMarkets: predictionMarkets, fullPredictionMarkets: fullArray}
};
