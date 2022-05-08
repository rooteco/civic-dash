import { useLoaderData, useParams, Outlet } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import widgetThemeStylesheetURL from "~/styles/widget-theme.css";
import { getProblemsByTheme, getIndicatorsByTheme } from "~/models/theme.server";
import invariant from "tiny-invariant";
import { DashboardWrapper } from '~/components/dashboard/DashboardWrapper';
import { ThemeLink } from '~/components/dashboard/linking-components/theme-link';
import { ThemeCarousel } from '~/components/dashboard/theme-carousel-components/theme-carousel';

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: widgetThemeStylesheetURL}
  ]
};

type LoaderData = {
  problems: Awaited<ReturnType<typeof getProblemsByTheme>>;
  indicators: Awaited<ReturnType<typeof getIndicatorsByTheme>>['indicators'];
  sparkData: Awaited<ReturnType<typeof getIndicatorsByTheme>>['sparkData'];
};

export const loader: LoaderFunction = async ({
  params
}) => {
  invariant(params.theme, "params.slug is required")

  const problems = await getProblemsByTheme(params.theme);
  invariant(problems, `problems for theme ${params.theme} not found`)

  const indicators = await getIndicatorsByTheme(params.theme)
  invariant(indicators, `indicators for theme ${params.theme} not found`)

  const data: LoaderData = {
    problems,
    ...indicators
  }
  return json(data)
}

export default function WidgetTheme(){
  const params = useParams();
  const data = useLoaderData<LoaderData>();
  return (
    <DashboardWrapper
      focusChild={<Outlet />}
      linkChild={<ThemeLink indicators={data.indicators}/>}
      themeCarouselChild={<ThemeCarousel data={data} params={params}/>}
      />
  )
};
