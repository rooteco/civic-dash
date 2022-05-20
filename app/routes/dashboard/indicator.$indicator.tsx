import { useLoaderData, Outlet, useParams } from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getThemes } from "~/models/theme.server";
import { getIndicatorsByAdminFavourite } from "~/models/user.server";
import { DashboardWrapper } from "~/components/dashboard/DashboardWrapper"
import { IndexLink } from "~/components/dashboard/linking-components/index-link";
import { IndexCarousel } from "~/components/dashboard/theme-carousel-components/index-carousel";

import { getPredictionsByIndicator } from "~/models/prediction.server"
import { IndexPrediction } from "~/components/dashboard/prediction-components/index-prediction"

import { evaluateIndicatorString } from "~/utils/evaluateIndicatorString"


type LoaderData = {
  themes: Awaited<ReturnType<typeof getThemes>>;
  indicators: Awaited<ReturnType<typeof getIndicatorsByFavourite>>['indicators'];
  sparkData: Awaited<ReturnType<typeof getIndicatorsByFavourite>>['sparkData'];
  predictionMarkets: Awaited<ReturnType<typeof getPredictionsByIndicator>>;
};

export const loader: LoaderFunction = async ({
  params
}) => {
  const themes = await getThemes();
  const indicators = await getIndicatorsByAdminFavourite();
  const predictionMarkets = await getPredictionsByIndicator(params.indicator);
  const data: LoaderData = {
    themes,
    ...indicators,
    predictionMarkets
  }
  return json(data)
};

export default function IndicatorDisplay(){
  const data = useLoaderData<LoaderData>();

  const params = useParams();
  return(
    <DashboardWrapper
        focusChild={<Outlet />}
        linkChild={<IndexLink
                      indicators={data.indicators}
                      evaluateIndicatorString={evaluateIndicatorString}
                      location="indicator"
                      />}
        themeCarouselChild={<IndexCarousel themes={data.themes}/>}
        predictionChild={<IndexPrediction
                            categoryType={`${params.indicator}`}
                            predictionMarkets={data.predictionMarkets}
                            />}
    />
  )
}
