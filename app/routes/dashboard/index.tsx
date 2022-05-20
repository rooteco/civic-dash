import { Link, useLoaderData, useOutletContext } from "@remix-run/react";
import { json } from "@remix-run/node";

import { getThemes } from "~/models/theme.server";
import { getFavouritedIndicators, getIndicatorsByAdminFavourite } from "~/models/user.server";
import { DashboardWrapper } from '~/components/dashboard/DashboardWrapper'
import { DashboardIntro } from "~/components/dashboard/focus-components/DashboardIntro"
import { IndexLink } from '~/components/dashboard/linking-components/index-link';
import { IndexCarousel } from "~/components/dashboard/theme-carousel-components/index-carousel"

import { getPredictionsByFavourite } from "~/models/prediction.server"
import { IndexPrediction } from "~/components/dashboard/prediction-components/index-prediction"

import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import type { UserContext } from "~/routes/dashboard"
import { authenticator } from "~/models/auth.server";

import { evaluateIndicatorString } from "~/utils/evaluateIndicatorString"

type LoaderData = {
  themes: Awaited<ReturnType<typeof getThemes>>;
  indicators: Awaited<ReturnType<typeof getIndicatorsByAdminFavourite>>['indicators'];
  sparkData: Awaited<ReturnType<typeof getIndicatorsByAdminFavourite>>['sparkData'];
  predictionMarkets: Awaited<ReturnType<typeof getPredictionsByFavourite>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  console.log("USER:", user)
  const themes = await getThemes();
  const indicators = user ? await getFavouritedIndicators(user.id) : await getIndicatorsByAdminFavourite();
  const predictionMarkets = await getPredictionsByFavourite();
  const data: LoaderData = {
    user: user,
    themes: themes,
    ...indicators,
    predictionMarkets: predictionMarkets
  }
  console.log("IMPORTANT DATA:", data.indicators)
  return json(data)
};

export default function DashboardIndex(){
  const data = useLoaderData<LoaderData>();

  return(
    <DashboardWrapper
        user={data.user}
        focusChild={<DashboardIntro user={data.user} />}
        themeCarouselChild={<IndexCarousel themes={data.themes}/>}
        linkChild={<IndexLink
                      indicators={data.indicators}
                      evaluateIndicatorString={evaluateIndicatorString}
                      location="index"
                      />}
        predictionChild={<IndexPrediction predictionMarkets={data.predictionMarkets}
                                                        />}
      />
  )
}
