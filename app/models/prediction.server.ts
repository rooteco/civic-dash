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

export async function getPredictionsByFavourite(): Promise<Array<Prediction>>{
  const predictionMarkets = await db.predictionMarket.findMany({
    where: {
      favourite: true
    }
  })
  return predictionMarkets
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
  return predictionMarkets
}

export async function getPredictionBySlug(prediction_slug: string): Promise<Prediction>{
  const predictionMarket = await db.predictionMarket.findUnique({
    where: {
      slug: prediction_slug
    }
  })
  return predictionMarket
};
