import { useLoaderData, useParams, Outlet } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { getProblemsByTheme, getIndicatorsByTheme } from "~/models/theme.server";
import invariant from "tiny-invariant";
import { DashboardWrapper } from '~/components/dashboard/DashboardWrapper';
import { IndexLink } from '~/components/dashboard/linking-components/index-link';
import { ThemeCarousel } from '~/components/dashboard/theme-carousel-components/theme-carousel';

import { getPredictionsByTheme } from "~/models/prediction.server"
import { IndexPrediction } from "~/components/dashboard/prediction-components/index-prediction"
import { authenticator } from "~/models/auth.server";

import { evaluateIndicatorString } from "~/utils/evaluateIndicatorString"

import { getFavouritedIndicatorSlugs } from "~/models/user.server"

import action from "~/actions/favouriteIndicator"
export { action }

type LoaderData = {
  problems: Awaited<ReturnType<typeof getProblemsByTheme>>;
  indicators: Awaited<ReturnType<typeof getIndicatorsByTheme>>['indicators'];
  favouritedIndicatorSlugs: Awaited<ReturnType<typeof getFavouritedIndicatorSlugs>>;
  sparkData: Awaited<ReturnType<typeof getIndicatorsByTheme>>['sparkData'];
  predictionMarkets: Awaited<ReturnType<typeof getPredictionsByTheme>>;
};

export const loader: LoaderFunction = async ({
  params, request
}) => {
  invariant(params.theme, "params.slug is required")

  const user = await authenticator.isAuthenticated(request);

  const problems = await getProblemsByTheme(params.theme);
  invariant(problems, `problems for theme ${params.theme} not found`)

  const indicators = await getIndicatorsByTheme(params.theme)
  invariant(indicators, `indicators for theme ${params.theme} not found`)

  const favouritedIndicatorSlugs = user ? await getFavouritedIndicatorSlugs(user.id) : [];

  const predictionMarkets = await getPredictionsByTheme(params.theme);
  invariant(predictionMarkets, `prediction markets for theme ${params.theme} not found`)

  const data: LoaderData = {
    problems,
    ...indicators,
    predictionMarkets,
    favouritedIndicatorSlugs,
    user
  }

  return json(data)
}

export default function WidgetTheme(){
  const params = useParams();
  const data = useLoaderData<LoaderData>();

  

  return (
    <DashboardWrapper
      user={data.user}
      focusChild={<Outlet />}
      linkChild={<IndexLink
                    user={data.user}
                    indicators={data.indicators}
                    evaluateIndicatorString={evaluateIndicatorString}
                    location='theme'
                    favouritedIndicatorSlugs={data.favouritedIndicatorSlugs}
                    />}
      themeCarouselChild={<ThemeCarousel data={data} params={params}/>}
      predictionChild={<IndexPrediction
                            predictionMarkets={data.predictionMarkets}
                            categoryType={`${params.theme}`}/>}
      />
  )
};
