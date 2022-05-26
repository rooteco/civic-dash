import { useLoaderData, useParams, Outlet } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { getIndicatorsByProblem } from "~/models/theme.server";
import invariant from "tiny-invariant";

import { DashboardWrapper } from "~/components/dashboard/DashboardWrapper"
import { ThemeProblemCarousel } from "~/components/dashboard/theme-carousel-components/theme-problem-carousel"
import { IndexLink } from "~/components/dashboard/linking-components/index-link"
// Note: You'd expect this component to be nested, but the UI demands that it's a fake nesting

import { getPredictionsByProblem } from "~/models/prediction.server"
import { IndexPrediction } from "~/components/dashboard/prediction-components/index-prediction";
import { authenticator } from "~/models/auth.server";

import { evaluateIndicatorString } from "~/utils/evaluateIndicatorString"

import { getFavouritedIndicatorSlugs } from "~/models/user.server"
import { addFavouritedIndicator, removeFavouritedIndicator } from "~/models/user.server"
import action from "~/actions/favouriteIndicator"
export { action }


type LoaderData = {
  indicators: Awaited<ReturnType<typeof getIndicatorsByProblem>>['indicators'];
  sparkData: Awaited<ReturnType<typeof getIndicatorsByProblem>>['sparkData'];
  predictionMarkets: Awaited<ReturnType<typeof getPredictionsByProblem>>;
};

export const loader: LoaderFunction = async ({
  params, request
}) => {
  const user = await authenticator.isAuthenticated(request);

  invariant(params.problem, `params.problem is required`);

  const indicators = await getIndicatorsByProblem(params.problem)
  invariant(indicators, `indicators not found for problem ${params.problem}`);

  const favouritedIndicatorSlugs = user ? await getFavouritedIndicatorSlugs(user.id) : [];

  const predictionMarkets = await getPredictionsByProblem(params.problem)
  invariant(predictionMarkets, `prediction markets not found for problem ${params.problem}`)

  const data: LoaderData = {
    ...indicators,
    predictionMarkets,
    favouritedIndicatorSlugs,
    user
  }
  return json(data)
}

export default function WidgetIndicator(){
  const params = useParams();
  invariant(params, "Params must be defined")

  const data = useLoaderData<LoaderData>();
  return(
    <DashboardWrapper
      user={data.user}
      focusChild={<Outlet />}
      themeCarouselChild={<ThemeProblemCarousel params={params}/>}
      linkChild={<IndexLink
                    user={data.user}
                    indicators={data.indicators}
                    evaluateIndicatorString={evaluateIndicatorString}
                    location="theme"
                    favouritedIndicatorSlugs={data.favouritedIndicatorSlugs}
                    />}
      predictionChild={<IndexPrediction
                          predictionMarkets={data.predictionMarkets}
                          categoryType={`${params.problem}`}/>}
      />
  )
};
