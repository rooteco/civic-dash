import { db } from "~/utils/db.server";
import { redis } from "~/models/redis.server"

enum Layout {
  SINGLE,
  DOUBLE
}

// TODO: Fix the weird type issue here
export type Config = {
  layout: Layout;
  layoutId: Number;

  id: Number;
  indicatorId: Number;

  xName: String;
  xType: String;
  yName: String;
  yType: String;
  chartType: String;

  height: Number;
  width: Number;
  margin: Number;
}


type Dataset = {
  data: Array<any>
}


export async function getConfigFromIndicator(indicator_slug: string): Promise<Config>{
  // have to use findMany here even though we're looking for a single config
  const config = await db.config.findMany({
    where: {
      indicator: {
        is: {
          slug: indicator_slug
        }
      }
    }
  })
  return config
}

export async function getDatasetFromIndicator(indicator_slug: string): Promise<Dataset | null> {
  const data: Dataset | null = await redis.get(indicator_slug)
  return data
}

export async function getIndicatorFromSlug(indicator_slug: string): Promise<Indicator>{
  const indicator = await db.indicator.findUnique({
    where: {
      slug: indicator_slug
    }
  })
  return indicator
}
