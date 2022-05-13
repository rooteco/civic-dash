import { Link, useLoaderData } from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";

import { getThemes, getIndicatorsByFavourite } from "~/models/theme.server";
import { DashboardWrapper } from '~/components/dashboard/DashboardWrapper'
import { DashboardIntro } from "~/components/dashboard/focus-components/DashboardIntro"
import { IndexIndicatorLink } from '~/components/dashboard/linking-components/index-indicator-link';
import { IndexCarousel } from "~/components/dashboard/theme-carousel-components/index-carousel"

import { getPredictionBySlug } from "~/models/prediction.server"
import { IndexPrediction } from "~/components/dashboard/prediction-components/index-prediction"


type LoaderData = {
  themes: Awaited<ReturnType<typeof getThemes>>;
  indicators: Awaited<ReturnType<typeof getIndicatorsByFavourite>>['indicators'];
  sparkData: Awaited<ReturnType<typeof getIndicatorsByFavourite>>['sparkData'];
  predictionMarket: Awaited<ReturnType<typeof getPredictionBySlug>>;
};

// TODO: Add invariants
export const loader: LoaderFunction = async ({
  params
}) => {
  invariant(params.predictionMarket, `params.predictionMarket is required`);

  const themes = await getThemes();
  invariant(themes, `themes not found`);

  const indicators = await getIndicatorsByFavourite();
  invariant(indicators, `favourited indicators not found`);

  const predictionMarket = await getPredictionBySlug(params.predictionMarket);
  invariant(predictionMarket, `prediction markets not found for slug ${params.predictionMarket}`)

  const data: LoaderData = {
    themes: themes,
    ...indicators,
    predictionMarket: predictionMarket
  }
  return json(data)
};

export default function WidgetIndex(){
  const data = useLoaderData<LoaderData>();
  console.log(data)
  return(
    <DashboardWrapper
        focusChild={<DashboardIntro />}
        linkChild={<IndexIndicatorLink indicators={data.indicators}/>}
        themeCarouselChild={<IndexCarousel themes={data.themes}/>}
        predictionChild={<IndexPrediction predictionMarket={data.predictionMarket}/>}
      />
  )
}
