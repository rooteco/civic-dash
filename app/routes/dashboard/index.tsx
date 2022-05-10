import { Link, useLoaderData } from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import widgetIndexStylesheetURL from "~/styles/dashboard-index.css";
import { json } from "@remix-run/node";

import { getThemes, getIndicatorsByFavourite } from "~/models/theme.server";
import { DashboardWrapper } from '~/components/dashboard/DashboardWrapper'
import { DashboardIntro } from "~/components/dashboard/focus-components/DashboardIntro"
import { IndexLink } from '~/components/dashboard/linking-components/index-link';
import { IndexCarousel } from "~/components/dashboard/theme-carousel-components/index-carousel"

import { getPredictionsByFavourite } from "~/models/prediction.server"
import { IndexPrediction } from "~/components/dashboard/prediction-components/index-prediction"

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: widgetIndexStylesheetURL}
  ]
};

type LoaderData = {
  themes: Awaited<ReturnType<typeof getThemes>>;
  indicators: Awaited<ReturnType<typeof getIndicatorsByFavourite>>['indicators'];
  sparkData: Awaited<ReturnType<typeof getIndicatorsByFavourite>>['sparkData'];
  predictionMarkets: Awaited<ReturnType<typeof getPredictionsByFavourite>>;
};

export const loader: LoaderFunction = async () => {
  const themes = await getThemes();
  const indicators = await getIndicatorsByFavourite();
  const predictionMarkets = await getPredictionsByFavourite();
  const data: LoaderData = {
    themes: themes,
    ...indicators,
    predictionMarkets: predictionMarkets
  }
  return json(data)
};

export default function WidgetIndex(){
  const data = useLoaderData<LoaderData>();
  return(
    <DashboardWrapper
        focusChild={<DashboardIntro />}
        linkChild={<IndexLink indicators={data.indicators}/>}
        themeCarouselChild={<IndexCarousel themes={data.themes}/>}
        predictionChild={<IndexPrediction predictionMarkets={data.predictionMarkets}/>}
      />
  )
}
