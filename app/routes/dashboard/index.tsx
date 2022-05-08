import { Link, useLoaderData } from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import widgetIndexStylesheetURL from "~/styles/widget-index.css";
import { json } from "@remix-run/node";
import { getThemes, getIndicatorsByFavourite } from "~/models/theme.server";
import { DashboardWrapper } from '~/components/dashboard/DashboardWrapper'
import { DashboardIntro } from "~/components/dashboard/focus-components/DashboardIntro"
import { IndexLink } from '~/components/dashboard/linking-components/index-link';

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: widgetIndexStylesheetURL}
  ]
};

type LoaderData = {
  themes: Awaited<ReturnType<typeof getThemes>>;
  indicators: Awaited<ReturnType<typeof getIndicatorsByFavourite>>['indicators'];
  sparkData: Awaited<ReturnType<typeof getIndicatorsByFavourite>>['sparkData'];
};

export const loader: LoaderFunction = async () => {
  const themes = await getThemes();
  const indicators = await getIndicatorsByFavourite();
  const data: LoaderData = {
    themes: themes,
    ...indicators
  }
  return json(data)
};

export default function WidgetIndex(){
  const data = useLoaderData<LoaderData>();
  return(
    <DashboardWrapper
        focusChild={<DashboardIntro />}
        themes={data.themes}
        indicators={data.indicators}
        linkChild={<IndexLink />}
      />
  )
}
