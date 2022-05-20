import { useLoaderData, Outlet, useParams } from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getThemes } from "~/models/theme.server";
import { getIndicatorsByAdminFavourite, getFavouritedIndicators, getFavouritedIndicatorSlugs } from "~/models/user.server";
import { DashboardWrapper } from "~/components/dashboard/DashboardWrapper"
import { IndexLink } from "~/components/dashboard/linking-components/index-link";
import { IndexCarousel } from "~/components/dashboard/theme-carousel-components/index-carousel";

import { getPredictionsByIndicator } from "~/models/prediction.server"
import { IndexPrediction } from "~/components/dashboard/prediction-components/index-prediction"

import { evaluateIndicatorString } from "~/utils/evaluateIndicatorString"
import { authenticator } from "~/models/auth.server";

import { addFavouritedIndicator, removeFavouritedIndicator } from "~/models/user.server"

type LoaderData = {
  themes: Awaited<ReturnType<typeof getThemes>>;
  indicators: Awaited<ReturnType<typeof getIndicatorsByFavourite>>['indicators'];
  sparkData: Awaited<ReturnType<typeof getIndicatorsByFavourite>>['sparkData'];
  predictionMarkets: Awaited<ReturnType<typeof getPredictionsByIndicator>>;
  favouritedIndicatorSlugs: Awaited<ReturnType<typeof getFavouritedIndicatorSlugs>>;
};

export const loader: LoaderFunction = async ({
  params, request
}) => {
  const user = await authenticator.isAuthenticated(request);

  const themes = await getThemes();
  const indicators = user ? await getFavouritedIndicators(user.id) : await getIndicatorsByAdminFavourite();
  const predictionMarkets = await getPredictionsByIndicator(params.indicator);
  const favouritedIndicatorSlugs = user ? await getFavouritedIndicatorSlugs(user.id) : [];
  const data: LoaderData = {
    user: user,
    themes,
    ...indicators,
    predictionMarkets,
    favouritedIndicatorSlugs
  }
  return json(data)
};

export default function IndicatorDisplay(){
  const data = useLoaderData<LoaderData>();

  const params = useParams();
  return(
    <DashboardWrapper
        user={data.user}
        focusChild={<Outlet />}
        linkChild={<IndexLink
                      user={data.user}
                      indicators={data.indicators}
                      evaluateIndicatorString={evaluateIndicatorString}
                      location="indicator"
                      favouritedIndicatorSlugs={data.favouritedIndicatorSlugs}
                      />}
        themeCarouselChild={<IndexCarousel themes={data.themes}/>}
        predictionChild={<IndexPrediction
                            categoryType={`${params.indicator}`}
                            predictionMarkets={data.predictionMarkets}
                            />}
    />
  )
}
