import { Link, useLoaderData, useOutletContext } from "@remix-run/react";
import { json } from "@remix-run/node";

import { getThemes, getIndicatorsByFavourite } from "~/models/theme.server";
import { DashboardWrapper } from '~/components/dashboard/DashboardWrapper'
import { DashboardIntro } from "~/components/dashboard/focus-components/DashboardIntro"
import { IndexLink } from '~/components/dashboard/linking-components/index-link';
import { IndexCarousel } from "~/components/dashboard/theme-carousel-components/index-carousel"

import { getPredictionsByFavourite } from "~/models/prediction.server"
import { IndexPrediction } from "~/components/dashboard/prediction-components/index-prediction"

import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import type { UserContext } from "~/routes/dashboard"


type LoaderData = {
  themes: Awaited<ReturnType<typeof getThemes>>;
  indicators: Awaited<ReturnType<typeof getIndicatorsByFavourite>>['indicators'];
  sparkData: Awaited<ReturnType<typeof getIndicatorsByFavourite>>['sparkData'];
  predictionMarkets: Awaited<ReturnType<typeof getPredictionsByFavourite>>;
};

export const loader: LoaderFunction = async () => {
  // TODO: indicators is unnecessarily fetching config here -> remove
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

export default function DashboardIndex(){
  const data = useLoaderData<LoaderData>();
  const user = useOutletContext<UserType>();
  console.log('THIS IS THE USER INFORMATION:', user)
  return(
    <DashboardWrapper
        focusChild={<DashboardIntro user={user} />}
        themeCarouselChild={<IndexCarousel themes={data.themes}/>}
        linkChild={<IndexLink indicators={data.indicators}/>}
        predictionChild={<IndexPrediction
                            predictionMarkets={data.predictionMarkets}
                                                        />}
      />
  )
}
