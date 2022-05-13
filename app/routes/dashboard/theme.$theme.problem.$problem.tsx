import { useLoaderData, useParams, Outlet } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { getIndicatorsByProblem } from "~/models/theme.server";
import invariant from "tiny-invariant";

import { DashboardWrapper } from "~/components/dashboard/DashboardWrapper"
import { ThemeProblemCarousel } from "~/components/dashboard/theme-carousel-components/theme-problem-carousel"
import { ThemeLink } from "~/components/dashboard/linking-components/theme-link"
// Note: You'd expect this component to be nested, but the UI demands that it's a fake nesting

import { getPredictionsByProblem } from "~/models/prediction.server"
import { IndexPrediction } from "~/components/dashboard/prediction-components/index-prediction";

type LoaderData = {
  indicators: Awaited<ReturnType<typeof getIndicatorsByProblem>>['indicators'];
  sparkData: Awaited<ReturnType<typeof getIndicatorsByProblem>>['sparkData'];
  predictionMarkets: Awaited<ReturnType<typeof getPredictionsByProblem>>;
};

export const loader: LoaderFunction = async ({
  params
}) => {
  invariant(params.problem, `params.problem is required`);

  const indicators = await getIndicatorsByProblem(params.problem)
  invariant(indicators, `indicators not found for problem ${params.problem}`);

  const predictionMarkets = await getPredictionsByProblem(params.problem)
  invariant(predictionMarkets, `prediction markets not found for problem ${params.problem}`)

  const data: LoaderData = {
    ...indicators,
    predictionMarkets
  }
  return json(data)
}

export default function WidgetIndicator(){
  const params = useParams();
  invariant(params, "Params must be defined")

  const data = useLoaderData<LoaderData>();
  console.log("DATA:", data)
  return(
    <DashboardWrapper
      focusChild={<Outlet />}
      themeCarouselChild={<ThemeProblemCarousel params={params}/>}
      linkChild={<ThemeLink indicators={data.indicators} />}
      predictionChild={<IndexPrediction
                          predictionMarkets={data.predictionMarkets}
                          categoryType={`${params.problem}`}/>}
      />
  )
};
