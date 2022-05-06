import { db } from "~/utils/db.server";

enum Layout {
  SINGLE,
  DOUBLE
}

type Config = {
  layout: Layout;
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
