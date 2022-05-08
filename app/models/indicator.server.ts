import { db } from "~/utils/db.server";
import { redis } from "~/models/redis.server"

enum Layout {
  SINGLE,
  DOUBLE
}

// TODO: Fix the weird type issue here
type Config = {
  layout: Layout;
  layoutId: Number;
  id: Number;
  indicatorId: Number;
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

export async function getDatasetFromIndicator(indicator_slug: string){
  const data = await redis.get(indicator_slug)
  return data
}
