import { Link, useLoaderData, useOutletContext, useActionData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useEffect } from "react";

import { getThemes } from "~/models/theme.server";
import { getFavouritedIndicatorSlugs, getFavouritedIndicators, getIndicatorsByAdminFavourite } from "~/models/user.server";
import { DashboardWrapper } from '~/components/dashboard/DashboardWrapper'
import { DashboardIntro } from "~/components/dashboard/focus-components/DashboardIntro"
import { IndexLink } from '~/components/dashboard/linking-components/index-link';
import { IndexCarousel } from "~/components/dashboard/theme-carousel-components/index-carousel"

import { getPredictionsByFavourite } from "~/models/prediction.server"
import { IndexPrediction } from "~/components/dashboard/prediction-components/index-prediction"

import type { LinksFunction, LoaderFunction, ActionFunction } from "@remix-run/node";
import type { UserContext } from "~/routes/dashboard"
import { authenticator } from "~/models/auth.server";

import { evaluateIndicatorString } from "~/utils/evaluateIndicatorString"

import { addFavouritedIndicator, removeFavouritedIndicator } from "~/models/user.server"

import action from "~/actions/favouriteIndicator"
export { action }

type LoaderData = {
  themes: Awaited<ReturnType<typeof getThemes>>;
  indicators: Awaited<ReturnType<typeof getIndicatorsByAdminFavourite>>['indicators'];
  sparkData: Awaited<ReturnType<typeof getIndicatorsByAdminFavourite>>['sparkData'];
  predictionMarkets: Awaited<ReturnType<typeof getPredictionsByFavourite>>;
  favouritedIndicatorSlugs: Awaited<ReturnType<typeof getFavouritedIndicatorSlugs>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  const themes = await getThemes();
  const indicators = user ? await getFavouritedIndicators(user.id) : await getIndicatorsByAdminFavourite();
  const predictionMarkets = await getPredictionsByFavourite();
  const favouritedIndicatorSlugs = user ? await getFavouritedIndicatorSlugs(user.id) : [];

  const data: LoaderData = {
    user: user,
    themes: themes,
    ...indicators,
    predictionMarkets: predictionMarkets,
    favouritedIndicatorSlugs
  }
  return json(data)
};

export default function DashboardIndex(){
  const data = useLoaderData<LoaderData>();
  const actionData = useActionData();

  useEffect(()=>{
    console.log("ACTION DATA:", actionData)
  }, [actionData])

  return(
    <DashboardWrapper
        error={actionData?.error}
        user={data.user}
        focusChild={<DashboardIntro user={data.user} />}
        themeCarouselChild={<IndexCarousel themes={data.themes}/>}
        linkChild={<IndexLink
                      user={data.user}
                      indicators={data.indicators}
                      evaluateIndicatorString={evaluateIndicatorString}
                      location="index"
                      favouritedIndicatorSlugs={data.favouritedIndicatorSlugs}
                      />}
        predictionChild={<IndexPrediction predictionMarkets={data.predictionMarkets}
                                                        />}
      />
  )
}
