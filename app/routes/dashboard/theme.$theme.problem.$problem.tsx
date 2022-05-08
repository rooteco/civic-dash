import { useLoaderData, useParams, Outlet } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import widgetThemeStylesheetURL from "~/styles/widget-theme.css";
import { getIndicatorsByProblem } from "~/models/theme.server";
import invariant from "tiny-invariant";

import { DashboardWrapper } from "~/components/dashboard/DashboardWrapper"
import { ThemeProblemCarousel } from "~/components/dashboard/theme-carousel-components/theme-problem-carousel"
import { ThemeLink } from "~/components/dashboard/linking-components/theme-link"
// Note: You'd expect this component to be nested, but the UI demands that it's a fake nesting

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: widgetThemeStylesheetURL}
  ]
};

type LoaderData = {
  indicators: Awaited<ReturnType<typeof getIndicatorsByProblem>>['indicators'];
  sparkData: Awaited<ReturnType<typeof getIndicatorsByProblem>>['sparkData'];
};

export const loader: LoaderFunction = async ({
  params
}) => {
  invariant(params.problem, `params.problem is required`);

  const indicators = await getIndicatorsByProblem(params.problem)
  invariant(indicators, `Indicators not found for problem ${params.problem}`);

  const data: LoaderData = {
    ...indicators
  }
  return json(data)
}

export default function WidgetIndicator(){
  const params = useParams();
  invariant(params, "Params must be defined")
  const data = useLoaderData<LoaderData>();
  return(
    <DashboardWrapper
      focusChild={<Outlet />}
      themeCarouselChild={<ThemeProblemCarousel params={params}/>}
      linkChild={<ThemeLink indicators={data.indicators} />}
      />
  )
};
